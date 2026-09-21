---
title: "How I Built Snoop: An OSINT Tool for Tracking Users Across the Internet"
draft: false
description: "A lightweight user enumeration tool that uses simple mirrors and HTTP status codes to reliably track usernames across the internet."
date: 2026-09-21
author: Andre
tags: ["OSINT"]
image: "/images/ankh.png"
---

Tracking usernames across multiple platforms is one of the most common tasks in OSINT. It seems simple, but platforms are constantly changing their behavior, removing error codes, blocking automated requests, and hiding useful network responses. Because of this, many well-known tools end up breaking or returning false positives.

That’s exactly why I built Snoop — a lightweight, focused user enumeration tool that uses an unconventional approach: leveraging third-party services to restore the ability to detect a user’s existence through HTTP responses.

This post explains the reasoning behind the tool and why this method worked better for me.

# The main idea behind Snoop

Instead of sending requests to the official social network site, Snoop uses third-party frontends, such as Nitter for Twitter/X.

```py
    if platform == "instagram":
        url = f"https://imginn.com/{username}/"
        display_url = f"https://instagram.com/{username}"
    elif platform == "twitter":
        url = f"https://nitter.privacydev.net/{username}"
        display_url = f"https://x.com/{username}"
```

> Why?

Many platforms have removed this logic, but alternative frontends still maintain it. This is a quick workaround I found to use in Snoop, using the classic Brazilian “gambiarra”.
If the user doesn’t exist → returns 404

If the user exists → returns 200
This makes OSINT much easier and more accurate.

## How Snoop works

The tool is very simple:

```md
- It builds a list of websites.
- For each one, it replaces the username in the URL.
- It sends a normal HTTP request.
- It checks the status code (mainly 200 or 404).
```

Because Snoop uses internet mirrors, it avoids the problems that other tools face today.
As time went on, I adapted the tool and added different approaches.
The example below shows one of the ways we found to perform requests.

```md
- https://publish.x.com/oembed?url=https://x.com/elonmusk -> 200
- https://publish.x.com/oembed?url=https://x.com/usuarioquenaoexiste123xyz -> 404
```

In general, I always add APIs and different methods. Because of that, I constantly need to keep renewing the code. But if you have more ideas on how to improve the tool or add more services, the source code is below:

> Source-Code https://github.com/AnkhCorp/Snoop