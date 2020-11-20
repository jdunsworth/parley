# Canvas API REST Dictionary
This document is meant to outline the Canvas system API endpoints that we use within Parley.

Additionally, if you are a user of Visual Studio Code, we've added instructions on how to call the URLs live straight from VSCode. See the next one for more information.

## Using api.rest
We've added the ability to call the Canvas endpoints directly from within VSCode with the help of a plugin called [`rest-client`](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

To do this, please install the `rest-client` plugin linked above and then copy the `.env-template` file from within this folder and rename to just `.env`. This file will keep your private Canvas API token (*see below for instructions on how to generate this token*).

# Canvas API

* [Canvas LMS API Documentation](https://canvas.instructure.com/doc/api/)
* [API Terms of Service](https://www.canvaslms.com/policies/api-policy)

## Generating an API Token

1. Login to canvas. (*e.g. https://dale.instructure.com/login/canvas*). This can be done from your students or observer account. If you have more than one child, it is recommended that you generate from an Observer account to see all.
1. Click **Account** > **Settings**
1. Scroll to **Approved Integrations** and click `+ New Access Token`
1. In the `Purpose` field, type in anything. We recommend you type in <kbd>Parley</kbd>
1. Leave `Expires` field blank unless you'd like to set an expiration date. If you do, you'll have to regenerate the token.
1. Click `Generate Token`
1. Copy the Token next to the **Token** title. This should start with something like `17160~LONGSTRINGOFTEXTHERE`
1. Paste the token in your `/canvas/.env` file next to the `CANVAS_TOKEN=` field and save.

Note: Keep this token safe as it will act on your accounts behalf. It can only be regenerated and not retrieved again. We do not assume any responsibility for tokens.

## Endpoints
Go here
