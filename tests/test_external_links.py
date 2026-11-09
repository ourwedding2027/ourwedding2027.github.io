from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
import unittest


INDEX_HTML = Path(__file__).resolve().parents[1] / "index.html"
HEAD_FALLBACK_CODES = {403, 404, 405, 501}


class ExternalWebsiteLinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        url = attributes.get("href") if tag == "a" else attributes.get("src") if tag == "iframe" else None
        if not url:
            return

        parsed_url = urlsplit(url)
        if parsed_url.scheme in {"http", "https"} and parsed_url.netloc:
            self.urls.append(url)


def request_status(url, method):
    request = Request(
        url,
        method=method,
        headers={"User-Agent": "WeddingWebsiteLinkCheck/1.0"},
    )
    with urlopen(request, timeout=8) as response:
        return response.status


def check_link_status(url):
    try:
        return request_status(url, "HEAD")
    except HTTPError as error:
        if error.code not in HEAD_FALLBACK_CODES:
            raise
    return request_status(url, "GET")


class ExternalWebsiteLinksTest(unittest.TestCase):
    def test_external_links_and_map_embeds_are_reachable(self):
        parser = ExternalWebsiteLinkParser()
        parser.feed(INDEX_HTML.read_text(encoding="utf-8"))
        self.assertTrue(parser.urls, "No external links were found in index.html")

        for url in parser.urls:
            with self.subTest(url=url):
                status = check_link_status(url)
                self.assertGreaterEqual(status, 200)
                self.assertLess(status, 400, f"Unexpected HTTP status {status}")


if __name__ == "__main__":
    unittest.main()