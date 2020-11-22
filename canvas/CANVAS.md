<!-- markdownlint-disable MD022 -->
# Canvas API REST Dictionary
This document is meant to outline the Canvas system API endpoints that we use within Parley.

Additionally, if you are a user of Visual Studio Code, we've added instructions on how to call the URLs live straight from VSCode. See the next one for more information.

## Using api.rest
We've added the ability to call the Canvas endpoints directly from within VSCode with the help of a plugin called [`rest-client`](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

To do this, please install the `rest-client` plugin linked above and then copy the `.env-template` file from within this folder and rename to just `.env`. This file will keep your private Canvas API token (*see below for instructions on how to generate this token*).

# Canvas API

* [Canvas ]
* [Canvas LMS API Documentation](https://canvas.instructure.com/doc/api/)
* [API Terms of Service](https://www.canvaslms.com/policies/api-policy)
* [Canvas Community](https://community.canvaslms.com/t5/Change-Log/tkb-p/changelog)
* [Practical API Usage](https://community.canvaslms.com/t5/Developers-Group/Canvas-APIs-Getting-started-the-practical-ins-and-outs-gotchas/ba-p/263685)


## Test & Beta Environments
All Canvas institutions come with a **BETA** and **TEST** environment. If you are doing read-only work, it's acceptable to run it against the **PRODUCTION** environment, however, any modifications should be run through the non-production environments.

* Test: `dale.test.instructure.com` (*Refreshes data from prudction every three weeks*)
* Beta: `dale.beta.instructure.com` (*Refreshes data from production every Saturday*)

The same credentials that you use on production work on both of these but the UI will be severely limited as a student or student observer since it's meant for API commands only. To use the API, you will have to generate a new token in whatever environment you intend on using. Note that these will reset during their reset period.

These environments also are used for testing upcoming changes being released by Instructure. You can see more information about the [release schedule here](https://community.canvaslms.com/t5/Releases/What-is-the-Canvas-release-schedule-for-beta-production-and-test/ta-p/242411). You can find out more information on the [test environment here](https://community.canvaslms.com/t5/Releases/What-is-the-Canvas-test-environment/ta-p/262267).

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



## Considerations

* All API responses are in JSON format.
* All integer ids in Canvas are 64 bit integers. String ids are also used in Canvas.
* To force all ids to strings add the request header `Accept: application/json+canvas-string-ids` This will cause Canvas to return even integer IDs as strings, preventing problems with languages (particularly JavaScript) that can't properly process large integers.
* All boolean parameters can be passed as true/false, t/f, yes/no, y/n, on/off, or 1/0. When using JSON format, a literal true/false is preferred, rather than as a string.
* For POST and PUT requests, parameters are sent using standard HTML form encoding (the application/x-www-form-urlencoded content type).
* POST and PUT requests may also optionally be sent in JSON format format. The content-type of the request must be set to application/json in this case. There is currently no way to upload a file as part of a JSON POST, the multipart form type must be used.
* With either encoding, all timestamps are sent and returned in ISO 8601 format (UTC time zone): `YYYY-MM-DDTHH:MM:SSZ`

## Endpoints
This will contain a list of endpoints and usage notes in the order of usage importance. The notes will likely be from the standpoint of a `StudentObserver` and/or `Student` role as it's the typical role for this application (*and the only thing I have access to*).

* [API Documentation](https://canvas.instructure.com/doc/api)
* [API Tester (Production)](https://dale.instructure.com/doc/api/live)
* [API Tester (Beta)](https://dale.beta.instructure.com/doc/api/live)
* [API Tester (Test)](https://dale.test.instructure.com/doc/api/live)


> Note: Student observers will have much more restricted access to course data than the students account will. You can list **Course Permissions** to get that list which will help with the UI. I found that it's generally only `read`, `read_announcements`, `read_forum`, `read_grades`, and `read_outcomes` whereas a student might also have `participate_as_student`, `post_to_forum`, `read_roster`, `create_*`. Each class likely varies.

* **User Info:** `/api/v1/users/:id(self)` - Show details for user
* **User Profile:** `/api/v1/users/:id(self)/profile` - Extended profile data for user.
* **Activity Stream:** `/users/self/activity_stream/summary` - Prefer this list over full activity stream. Lists global activity stream counts/unreads including Message, Conversations, and Submissions.
* **Observees:** `/api/v1/users/self/observees` - List all users this account is observing.
* **Observee:** `/api/v1/users/self/observees/:observee_id` - Get information about specific user.
* **Course List for User:** `/api/v1/users/:id(self)/courses` - Get list of courses for a user
* **Course Permissions:** `/api/v1/courses/:courseid/permissions` - Get list of course permissions as user

* **Course Modules:** `/api/v1/courses/:courseid/modules` - Modules (Week)

https://dale.instructure.com:443/api/v1/courses/571/modules/4631/items



## API Flow

1. Get own user information: `/api/v1/users/self/profile`
1. Get list of users observing: `/api/v1/users/self/observees`
1. Get list of courses for each user: `/api/v1/users/:observee_id/courses`