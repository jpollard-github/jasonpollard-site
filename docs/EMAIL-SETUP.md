# Email setup for `hello@jasonpollard.com`

This checklist is tailored to the current setup:

- Domain registrar: Namecheap
- Website hosting: Vercel
- Public address: `hello@jasonpollard.com`
- Existing private inbox: `jpollard91@msn.com`
- Preferred outcome:
  - people see only `hello@jasonpollard.com`
  - inbound mail is easy to monitor
  - replies and new messages are sent from `hello@jasonpollard.com`
  - the MSN address remains private
  - the ArcadeGhosts signature does not hitch a ride into job outreach

Do not publish or promote `hello@jasonpollard.com` until inbound delivery, outbound sending, authentication, and reply behavior have all been verified.

---

## Recommended model

Use a **Namecheap Private Email mailbox** for `hello@jasonpollard.com`, not only Namecheap's forwarding-only feature.

A forwarding-only alias can deliver incoming messages to the MSN inbox, but forwarding by itself does not provide an authenticated outbound mailbox. Replying from Outlook.com would normally send from `jpollard91@msn.com`, which defeats the purpose of the professional address.

The recommended arrangement is:

1. Create a real `hello@jasonpollard.com` mailbox in Namecheap Private Email.
2. Add that mailbox to an email client that supports multiple accounts, such as Outlook for Windows or Mac, new Outlook, Outlook mobile, Apple Mail, or another IMAP/SMTP client.
3. Keep the existing MSN account in the same client if a combined workflow is useful.
4. Optionally forward a copy of inbound professional mail to `jpollard91@msn.com` for visibility.
5. Always send and reply through the Namecheap mailbox when the visible From address should be `hello@jasonpollard.com`.

### Important Outlook distinction

`outlook.live.com` / Outlook.com webmail is the web interface for the MSN account. Do not assume it can authenticate against Namecheap's SMTP server and send as the custom domain.

For reliable outbound mail from `hello@jasonpollard.com`, use one of these:

- Namecheap Private Email webmail
- Outlook desktop or new Outlook with the Namecheap mailbox added as a separate account
- Outlook mobile with the Namecheap mailbox added
- another mail client configured with Namecheap's IMAP and SMTP settings

When composing, verify that the From field says `hello@jasonpollard.com` before sending.

---

## Phase 1: Purchase and create the mailbox

- [x] Sign in to the Namecheap account that owns `jasonpollard.com`.
- [x] Purchase an appropriate Namecheap Private Email plan.
- [x] Assign the plan to `jasonpollard.com`.
- [x] Create the mailbox:
  - Address: `hello@jasonpollard.com`
  - Display name: `Jason Pollard`
- [x] Use a unique password stored in a password manager.
- [x] Enable multi-factor authentication wherever Namecheap or the mailbox service supports it.
- [x] Store account recovery details securely.
- [x] Sign in to Namecheap Private Email webmail and confirm the mailbox opens.
- [x] Do not configure a public résumé or website link to the address as “ready” yet.

---

## Phase 2: Determine where DNS is authoritative

Namecheap can be the registrar without being the active DNS host.

Before editing records, check the domain's nameservers:

- If the domain uses **Namecheap BasicDNS**, add the mail records in:
  - Namecheap Dashboard
  - Domain List
  - Manage `jasonpollard.com`
  - Advanced DNS
- If the domain uses **Vercel nameservers**, add the mail records in Vercel DNS.
- If it uses another DNS provider, add the records there.

Do not add the same records in multiple dashboards and assume they combine. Only the authoritative DNS provider matters.

Record the current arrangement:

- Registrar: Namecheap
- Authoritative DNS provider: `NAMECHEAP`
- Nameservers: `Namecheap BasicDNS`
- Date checked: `2026-07-15`

---

## Phase 3: Configure Namecheap Private Email DNS

### Preferred path when using Namecheap BasicDNS

- [x] In Namecheap Advanced DNS, locate **Mail Settings**.
- [x] Select the **Private Email** preset for `jasonpollard.com`.
- [x] Confirm that Namecheap creates the expected MX and SPF records.

Hostname Record type Priority Value
@ MX 10 mx1.privateemail.com
@ MX 10 mx2.privateemail.com
@ TXT v=spf1 include:spf.privateemail.com ~all

- [x] Do not leave old or conflicting MX records in place.
- [x] Do not create a second SPF record.

### DNS safety checks

- [x] There is only one effective SPF TXT record for the root domain.
- [x] The SPF record authorizes Namecheap Private Email.
- [x] No obsolete MX records remain.
- [x] The website's Vercel records remain intact.
- [x] No credentials, mailbox passwords, or recovery data are committed to Git.
- [x] Record the final non-secret DNS configuration in this file or a private setup note.
      See above

Final DNS notes:

```text
Authoritative DNS provider: Namecheap BasicDNS
MX records: see above
SPF: see above
DKIM selector and host: privateemail._domainkey
DMARC: see below DONE
Date verified: 2026-07-15
```

---

## Phase 4: Add DMARC

Start with a monitoring policy after SPF and DKIM are working.

- [x] Add one TXT record at `_dmarc.jasonpollard.com`.
- [x] Start with `p=none`.
- [x] Keep the record simple until real messages pass SPF and DKIM.
- [ ] If aggregate reports are enabled, send them only to a mailbox or reporting service you control. ??? I don't know,
- [ ] After several successful tests, consider tightening the policy to `quarantine` and eventually `reject`.
- [ ] Do not tighten DMARC before confirming all legitimate sending paths.

Example starter policy to review before publishing:

```text
v=DMARC1; p=none; adkim=s; aspf=s
```

If a report destination is later added, create and verify that destination before including it in DMARC.

---

## Phase 5: Choose the daily email workflow

Not doing Option A:

### Option A: Recommended, use both accounts in Outlook

This gives one application with two real accounts:

- `jpollard91@msn.com`
- `hello@jasonpollard.com`

- [ ] Add the Namecheap account to Outlook as a separate email account.
- [ ] Use the exact automatic or manual settings displayed by Namecheap.
- [ ] If manual configuration is required, use the provider's current:
  - IMAP host and encrypted port
  - SMTP host and encrypted port
  - authentication requirement
  - full mailbox address as the username
- [ ] Confirm both inboxes are visible.
- [ ] Compose a new message and select `hello@jasonpollard.com` in the From field.
- [ ] Reply to a message received by the professional account and confirm the reply also uses the professional From address.
- [ ] Set the professional account as the default only if that is desirable. Otherwise, check From before every job-related message.

**Using this:**

### Option B: Namecheap webmail for professional mail

- [x] Use the Namecheap Private Email webmail interface for job-search correspondence.
- [x] Keep MSN open separately for personal mail.
- [x] Confirm the Namecheap webmail display name is `Jason Pollard`.
- [x] Create a minimal professional signature.
- [x] Bookmark the webmail login.

This is less integrated but has the fewest opportunities to send from the wrong account.

Not doing option C

### Option C: Forward inbound mail to MSN, send elsewhere

This is acceptable only if the forwarding is convenient and outbound mail still goes through the Namecheap mailbox.

- [ ] Configure forwarding from `hello@jasonpollard.com` to `jpollard91@msn.com` using Namecheap's supported mailbox or filtering feature.
- [ ] Decide whether to retain a copy in the Namecheap mailbox.
- [ ] Do not reply from the forwarded copy in Outlook.com unless the From field is definitely `hello@jasonpollard.com`.
- [ ] For replies, switch to Namecheap webmail or an email client with the Namecheap account configured.
- [ ] Test whether forwarding reveals the private destination address in headers or reply behavior.

This option adds friction and creates a greater chance of replying from MSN. Option A is cleaner.

---

## Phase 6: Remove the current ArcadeGhosts signature

The screenshot shows an automatic ArcadeGhosts signature in the MSN/Outlook compose window. Remove it before professional outreach.

### Outlook.com or Outlook on the web

- [x] Open Outlook settings.
- [x] Go to **Accounts > Signatures**.
- [x] Select the ArcadeGhosts signature.
- [x] Delete it, or disable its automatic use for:
  - new messages
  - replies and forwards
- [x] Save the settings.
- [x] Existing drafts may still contain the old signature. Remove it manually from any open draft.
- [x] Start a brand-new message and confirm the signature no longer appears.

### Outlook desktop or new Outlook

- [x] Open **Settings > Accounts > Signatures** in new Outlook, or the equivalent signature settings in classic Outlook.
- [x] Select each account separately.
- [x] Remove the old ArcadeGhosts signature from the MSN account or set its defaults to none.
- [x] Create a separate professional signature only for `hello@jasonpollard.com`.

### Suggested professional signature

Keep it plain and compact:

```text
Jason Pollard
Staff / Principal Software Engineer | Solutions Architect
jasonpollard.com
```

A shorter version is also fine:

```text
Jason Pollard
jasonpollard.com
```

Avoid:

- a large image banner
- social icons
- phone number unless deliberately shared
- the private MSN address
- inspirational quotations
- seven certification acronyms marching across the screen

---

## Phase 7: Test inbound and outbound mail

Use at least two unrelated mailbox providers when possible.

N/A

### Inbound

- [x] Send a message from the MSN account to `hello@jasonpollard.com`.
- [x] Confirm it reaches the Namecheap mailbox.
- [ ] If forwarding is enabled, confirm it also reaches MSN.
- [ ] Send another inbound test from a different provider.
- [x] Check spam and junk folders.

N/A

### Outbound

- [x] Send from `hello@jasonpollard.com` to the MSN account.
- [x] Confirm the visible From address is exactly `hello@jasonpollard.com`.
- [x] Confirm the display name is `Jason Pollard`.
- [x] Reply from MSN and confirm the response returns to the Namecheap mailbox.
- [x] Send from `hello@jasonpollard.com` to another major provider.
- [x] Check whether the message lands in Inbox (this one!), Promotions, Other, or Spam.

Need to do:

### Authentication

Inspect the received message headers and confirm:

- [x] SPF passes.
- [x] DKIM passes.
- [x] DMARC passes.
- [x] The visible From domain is `jasonpollard.com`.
- [x] The private MSN address is not exposed as the sender or reply address.
- [x] The old ArcadeGhosts signature is absent.

Record the test:

```text
Test date: 2026-07-15
Sent from: Private Email
Sent to: jpollard91@msn.com, jpollard91@gmail.com
Inbound result: All good
Outbound result: All good
SPF: pass (both)
DKIM: pass (both)
DMARC: pass (both)
Spam placement: First message from hello@jasonpollard.com went to Junk
Reply behavior: Fine, received in Private Email
Notes:



```

---

## Phase 8: Website launch gate

Only after all tests pass:

- [ ] Confirm `hello@jasonpollard.com` works from the deployed site's `mailto:` links.
- [ ] Confirm the address in page content, metadata, and JSON-LD is correct.
- [ ] Send a message using the website link.
- [ ] Reply from the professional account.
- [ ] Confirm the From address and signature one final time.
- [ ] Mark the address operational in the deployment checklist.

---

## Troubleshooting

### Incoming mail does not arrive

- Confirm the authoritative DNS provider.
- Confirm the MX records are present there, not only in an inactive DNS dashboard.
- Remove conflicting MX records.
- Allow time for DNS caching.
- Use Namecheap's mailbox and DNS diagnostics.

### Mail arrives at Namecheap but not MSN

- Confirm the forwarding rule is enabled.
- Check MSN junk mail and blocked-sender settings.
- Confirm the forwarding destination is spelled correctly.
- Consider using both accounts directly in Outlook instead of forwarding.

### Replies show the MSN address

- The message was sent from the MSN account rather than the Namecheap mailbox.
- Add the Namecheap mailbox to Outlook as a separate account, or reply through Namecheap webmail.
- Do not treat a forwarding alias as an authenticated outbound identity.
- Verify the From selector before sending.

### SPF fails

- Confirm there is only one SPF record.
- Confirm it includes Namecheap's current authorization value.
- Remove obsolete sending services only after confirming they are no longer used.

### DKIM is missing or fails

- Enable DKIM in Namecheap Private Email.
- Copy the selector and TXT value exactly.
- Confirm it was added at the authoritative DNS provider.
- Wait for DNS caching, then retest.

### DMARC fails

- First confirm SPF or DKIM alignment with the visible From domain.
- Keep the policy at `p=none` while diagnosing.
- Do not “fix” the symptom by disabling authentication.

---

## Security and privacy

Never commit or publish:

- Namecheap account credentials
- mailbox passwords
- app passwords
- recovery codes
- DNS-account credentials
- support PINs
- full raw email headers containing private routing details
- screenshots that reveal account identifiers or private addresses

The public repository may document the process and non-secret record types. Secrets belong in the password manager and provider dashboards.

---

## Final implementation record

Complete this after setup:

```text
Mail provider: Namecheap Private Email
Mailbox: hello@jasonpollard.com
Professional mailbox: hello@jasonpollard.com
Daily client: Namecheap Private Email webmail
Forwarding enabled: no
Copy retained at Namecheap: yes
Authoritative DNS provider: Namecheap BasicDNS
SPF verified: yes
DKIM verified: yes
DMARC verified: yes
Professional signature verified: yes
Website mailto verified: in progress
Operational date:
```
