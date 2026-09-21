---
title: "Cyrillic Phishing: When a Domain Looks Legit"
description: "How one swapped Unicode character turns a familiar domain into an attacker's, and the quick checks that catch it before you click."
date: 2026-01-13
author: "ANKHCORP"
image: "/images/ankh.png"
tags: ["Phishing", "Red Team", "DNS", "Unicode"]
---

An Apple developer — someone who had spent ten years reading the company’s official emails, the kind of person who clicks nothing — nearly fell for a phishing message recently. Not because the email was well written. It wasn't. The domain just *looked* right.

He did the one thing most people don't: inspected it character by character. One of the letters wasn't from the alphabet it claimed to be.

## The 'a' that isn't an 'a'

Latin `a` is U+0061. Cyrillic `а` is U+0430. They render identically at almost any size, in almost any font. Side by side — a а — even on a good monitor you won't pick the fake.

But DNS doesn't read shapes. It reads code points. A domain built with the Cyrillic character is a completely different domain on the internet's books: registered by the attacker, resolving to the attacker's server — and perfectly eligible for a valid TLS certificate, padlock and all.

That's an IDN homograph attack. No exploit, no zero-day. It abuses the gap between how humans read (word shapes) and how computers read (bytes).

## Why the message still felt off

The domain passed the eye test, but the email had the usual tells you start noticing after reading a few hundred of these:

- It never used his name.
- It didn't mention any specific account, order, or app.
- The wording stayed generic while still sounding "on brand".

That balance is deliberate. Specifics create facts, and facts can be wrong — a wrong fact gets the whole scheme caught. Generic urgency plus a trusted-looking sender is cheaper and works more often.

## Checking a domain without trusting your eyes

The eye is the wrong tool here. A check that takes seconds:

```console
$ python3 -c "print(any(ord(c) > 127 for c in 'аpple.com'))"
True
```

In the browser, look at the punycode: IDN domains with mixed scripts show up as `xn--...` in the address bar on several browsers. If you see that prefix on a domain that has no business having it, close the tab.

`whois` fills in the rest: registrant and domain age usually tell the whole story.

## Why this keeps working

Humans read words as shapes — it's why you can read a paragraph with the letters scrambled inside words. Browsers have improved (most now warn or show punycode for mixed-script domains), but display rules vary, and the certificate never saved you anyway: the padlock only says the connection is encrypted *to whoever owns the domain*. It has never said who that is.

If someone with a decade of exposure to a brand's real emails hesitates for a second, everyone below that bar is fair game. The technique is silent, costs nothing, and scales.

So the takeaway isn't "look more carefully". It's: let machines do the character-level checking — your eyes are exactly what this attack is aimed at.
