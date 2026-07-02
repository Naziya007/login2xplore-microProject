# Project Management Form using JsonPowerDB (JPDB)

## Table of Contents
- [Description](#description)
- [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
- [Scope of Functionalities](#scope-of-functionalities)
- [Illustrations](#illustrations)
- [Examples of Use](#examples-of-use)
- [Project Status](#project-status)
- [Release History](#release-history)
- [Sources](#sources)
- [Other Information](#other-information)

## Description
This is a micro project built as part of the **Introduction to JsonPowerDB - V2.0** course. It is a simple, single-page **Project Management Form** that lets a user create and update project records directly against a JsonPowerDB (JPDB) database - with no backend server required, since the browser talks straight to the JPDB REST API.

The form stores data in the `PROJECT-TABLE` relation of the `COLLEGE-DB` database, with `Project-ID` acting as the primary key.

**Fields captured:**
| Field | Description |
|---|---|
| Project ID | Primary key, uniquely identifies each project |
| Project Name | Name/title of the project |
| Assigned To | Person or team the project is assigned to |
| Assignment Date | Date the project was assigned |
| Deadline | Project completion deadline |

**Form behavior:**
1. On page load, only the **Project ID** field is enabled; everything else (fields + Save/Update/Reset buttons) is disabled, and the cursor sits in Project ID.
2. When a Project ID is entered:
   - **If it doesn't exist** in the database → the rest of the fields and the `Save` + `Reset` buttons are enabled.
   - **If it already exists** → the record's data is loaded into the form, Project ID is locked, and `Update` + `Reset` are enabled.
3. All fields are validated as non-empty before `Save` or `Update` is allowed to run.
4. After a successful `Save`, `Update`, or `Reset`, the form returns to its blank, step-1 state.

## Benefits of using JsonPowerDB

**Key Features:**
- Nimble, simple to use, in-memory, real-time database
- **Schema-free** - easy to maintain, no rigid table structures to manage
- **Serverless support** - enables fast development and cuts time to market
- **Multi-Mode database** - a single solution for a variety of data types
- Built around **PowerIndex**, one of the world's fastest indexing engines
- **Webservices API** - directly callable from the frontend, lowering development cost (this is exactly how this project talks to JPDB via `jpdb-commons.js`)
- A single instance can support **millions of indexes**
- Inbuilt support for querying multiple databases
- Multiple security layers
- **Server-side native NoSQL** - built for best possible performance

**Why Prefer JsonPowerDB:**
- Minimum development cost
- Minimum time to market
- Minimizes the complexity of interoperability between different applications
- Maximum data processing performance
- Technology built for the future:
  - Fills the gap between traditional databases and big-data systems
  - Pluggable with new algorithms
  - Pluggable and user-defined API
- Minimizes total cost of ownership

For a project like this one, these features translate directly into practical benefits: no backend server was written at all — the browser calls the JPDB Webservices API straight from `index.js` using `jpdb-commons.js` helper functions (`createPUTRequest`, `createGET_BY_KEYRequest`, `createUPDATERecordRequest`, `executeCommandAtGivenBaseUrl`) - which kept development cost and time-to-market to a minimum for this micro project.

## Scope of Functionalities
- Create a new project record (`Save`)
- Look up an existing project record by Project ID (`GET_BY_KEY`)
- Update an existing project record (`Update`)
- Reset the form back to its initial blank state (`Reset`)
- Client-side field validation (no empty fields allowed)
- Primary key protection (Project ID field is locked once a record is loaded for update)

**Out of scope (not implemented in this version):**
- Deleting records
- Listing / searching all projects
- User authentication
- Server-side validation

## Illustrations
```
+-----------------------------------------------+
|      Project Management Form using JPDB       |
+-----------------------------------------------+
| Project ID :        [___________]             |
| Project Name :       [___________]             |
| Assigned To :        [___________]             |
| Assignment Date :     [___________]             |
| Deadline :           [___________]             |
|                                                 |
|      [ Save ]   [ Update ]   [ Reset ]         |
+-----------------------------------------------+
```

## Examples of Use
**Adding a new project:**
1. Type a new Project ID, e.g. `P101`, and move out of the field.
2. Since `P101` doesn't exist yet, the rest of the fields unlock.
3. Fill in Project Name, Assigned To, Assignment Date, and Deadline.
4. Click **Save** - the record is inserted into `COLLEGE-DB | PROJECT-TABLE`.

**Updating an existing project:**
1. Type an existing Project ID, e.g. `P101`.
2. The form auto-fills with the stored data; Project ID is locked.
3. Change any of the other fields.
4. Click **Update** - the record is updated in place.

## Project Status
 **Active / Complete for course submission** - core Save/Update/Reset flow is implemented and working against the JPDB API.

Possible future improvements:
- Add a Delete button
- Add a searchable list/table view of all projects
- Add date-range validation (Deadline must be after Assignment Date)

## Release History
| Version | Date | Notes |
|---|---|---|
| v1.0 | 2026-07-02 | Initial release - Project Management Form with Save, Update, Reset and Project-ID based lookup against JPDB |

## Sources
- [JsonPowerDB API Command Reference](https://www.login2explore.com/jpdb/api-doc.html)
- [Introduction to JsonPowerDB - V2.0 Course](https://labs.login2explore.com/course/view.php?id=14)
- `jpdb-commons.js` helper library, provided by JsonPowerDB

## Other Information
- **Tech stack:** HTML5, Bootstrap 3.4.1, jQuery 3.5.1, JsonPowerDB REST API
- **Database:** `COLLEGE-DB`
- **Relation:** `PROJECT-TABLE`
- **Primary Key:** `Project-ID`
- Before running locally, set your own `connToken` in `index.js` (get it from the JPDB Dashboard → Tools → Tokens panel).

## Author
Naziya
