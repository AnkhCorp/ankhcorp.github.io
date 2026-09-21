---
title: "How Open-Source Intelligence Helped Bring a Child Predator to Justice"
draft: true
description: "A real-world OSINT case study: how URLScan, Censys, and cross-platform username correlation mapped a criminal's infrastructure and led to an arrest through legal cooperation."
date: 2025-12-09
author: Andre Rocha
tags: ["OSINT"]
image: "/images/ankh.png"
---

## 1. The Starting Point: Associating Assets
An investigation began with a primary website (Site A) suspected of hosting illicit material. This site was protected by Cloudflare, masking its true server IP. The first step was to find historical data or associated assets.

Technique & Tool: Historical Domain Analysis
We used URLScan.io (specifically its search API: https://urlscan.io/api/v1/search/?q=domain:[TARGET_DOMAIN]&size=10000) to find historical scans, subdomains, and related infrastructure linked to the target. This search revealed an older, related domain (Site B) that was previously used for the same content but was no longer behind Cloudflare.


## 2. Expanding the Footprint: IP & Host Correlation
The older domain (Site B) provided a crucial clue: its origin IP address. This IP was a key pivot point.

Technique & Tool: Reverse IP & Hosting Lookup
We took the discovered IP and queried it on Censys (search.censys.io). This search engine for internet devices confirmed the hosting provider and, critically, listed another domain (Site C) hosted on the same server. We also used URLScan.io again, this time searching by the IP address, to find other domains pointing to it. Visual and structural comparison of Sites A, B, and C confirmed common ownership.

## 3. Profile Aggregation: Linking Digital Identities
With multiple domains tied to one operator, the next step was to find their public profiles.

Technique: Cross-Platform Username Matching
A support page on one site listed a contact username for Telegram. Searching this username led to a public profile. On this profile, the individual shared an invite link to a Discord server. Within that server's public information, the old domain (Site B) was listed, creating a verified link between the digital identities and the web assets

## 4. Security Posture & Vulnerability Assessment
Understanding the technical setup can inform about the operator's security awareness.

Technique & Tool: CMS Vulnerability Scanning
The sites were built on WordPress. We used WPScan (the WordPress security scanner) to enumerate plugins, themes, and users. The scan identified an outdated plugin with a known vulnerability. We referenced the CVE Mitre database (cve.mitre.org) to get details on the specific vulnerability (e.g., CVE-2025-22738), confirming it was a Cross-Site Scripting (XSS) flaw.

## 5. The Operator's Counter-Measures
The investigation noted the operator had migrated the primary site (Site A) behind Cloudflare, indicating an attempt to hide the origin server after the older IP was exposed—a common OPSEC step.

Key Tools Used in This Scenario:

URLScan.io: For historical domain analysis, finding related infrastructure, and reverse IP lookups.

Censys.io: For deep-dive analysis of IP addresses, open ports, and hosting certificates.

WPScan: For enumerating and assessing the security of WordPress-based websites.

CVE Mitre Database: For researching and confirming the details of known software vulnerabilities.

Public Search Engines & Platform Search Functions: For correlating usernames across Telegram, Discord, and other social platforms.

OSINT Lessons Reinforced:

Tool Chaining: The power of OSINT comes from using tools in sequence. The chain was: URLScan (for history) -> Censys (for IP/domain correlation) -> Manual review (for pattern matching) -> WPScan (for vuln assessment).

Pivoting is Essential: An exposed IP address is a goldmine. Tools like Censys and URLScan specialize in revealing what else is connected to it.

Public Information is Everywhere: Community Discord servers, public Telegram bios, and even error pages on websites (which can reveal hosting provider info) all contain valuable, connective data.

Ethical Boundaries: All information was gathered from publicly accessible sources and interfaces. No systems were accessed without authorization. This research was conducted to understand attribution and infrastructure, not to exploit vulnerabilities.

This fictional case study demonstrates how a combination of specialized scanners and persistent, manual correlation of public data can map a target's digital footprint, highlighting both the methodology and the specific tools that make it possible.


## Important Closing Note

This case study is not a theoretical exercise. It documents real OSINT techniques applied to a genuine investigation into the distribution of illegal material. The evidence gathered through these methods was compiled into a formal report and submitted to the relevant law enforcement agencies, including the Brazilian Federal Police.

As a direct result of this investigation and subsequent international legal cooperation, the individual operating these websites was identified, located, and arrested in Mexico. The hosting providers were formally notified, leading to the removal of the illegal content and the takedown of the associated domains.

This outcome underscores a critical principle: the power of Open-Source Intelligence (OSINT) lies not in vigilantism, but in its capacity to provide actionable, evidence-based leads to the proper authorities. Ethical OSINT, conducted within legal frameworks, is a vital tool in supporting law enforcement, protecting the vulnerable, and holding malicious actors accountable.

This post serves to educate on methodology and tools, with the hope of empowering others to use these skills responsibly for the greater good.