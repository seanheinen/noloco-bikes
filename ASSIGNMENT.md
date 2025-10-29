# 👋 Welcome to the Take-Home Exercise

**Please read the task in full, and if you have any questions reach out to [darragh@noloco.io](mailto:darragh@noloco.io).**

---

## 🧩 Background

Noloco's mission is to **unleash the power and possibility trapped inside spreadsheets and other data sets.**  
One of the ways we do this is by wrapping those datasets in a standard API for querying and filtering, and by deriving the schema of the dataset.

Often, we can fetch the schema directly from the data source (such as with Airtable), but sometimes we need to **derive the schema ourselves.**

---

## 🧠 The Task

Your task is to:

- Fetch the **Dublin Bikes dataset**
- **Dynamically derive its schema**
- Allow users to **perform basic queries** on that data

To do this, create a simple **web API** with two endpoints:

---

### **GET: `/schema`**

This endpoint calculates and returns the most appropriate data schema (as defined below) of the **Dublin Bikes dataset.**

- The response should be a **JSON array of Field objects** (as defined below).
- The schema should be **derived dynamically** from the dataset (not hardcoded).
- The code should be able to handle **any similarly shaped dataset/URL.**

⚠️ Assume this isn't a clean dataset — values should be **normalized** to the most reasonable data type.

---

### **POST: `/data`**

This endpoint returns the dataset after applying any **filters** from the body of the request,  
using the schema’s **standardized field names** (instead of the raw dataset keys).

---

## 🧱 Data Models

### **Field**

The Dublin Bikes dataset is an array of JSON objects. Each key represents a `Field` object.

| Attribute | Description |
|------------|-------------|
| **display** | The original column/value name |
| **name** | A unique, camelCase version of the display name (no punctuation, spaces, or non-standard characters). <br> Use something like Lodash `camelCase`. <br> **Examples:** <br> `Item Number` → `itemNumber` <br> `Order number (old)` → `orderNumberOld` <br> `Description: plain` → `descriptionPlain` |
| **type** | The type of data this field represents (see `DataType` below) |
| **options** | Array of possible options if `type` is `OPTION` (empty otherwise) |

---

### **DataType**

Represents the kind of value a field holds. Can be one of:

| Value | Description | Example 1 | Example 2 |
|--------|--------------|------------|------------|
| **TEXT** | Any text/string values | `21 Newcourt Road` | `77 Camden Street` |
| **INTEGER** | Integer values | `12` | `42` |
| **FLOAT** | Decimal numbers | `15.341` | `1.15` |
| **DATE** | Date or time values | `12/05/1994` | `2025-05-01` |
| **BOOLEAN** | True/false values | `false` | `TRUE` |
| **OPTION** | Finite set of text options | Categories:<br>Engineering<br>Medicine<br>Pharmacy | Status:<br>To Do<br>In Progress<br>Done |

---

### 🧾 Example

#### Row
```json
{
  "id": 7,
  "Address": "21 Newcourt Road",
  "Date (of arrival)": "12/05/1994",
  "discount percentage": 12.33
}
```

#### Schema
```json
[
 {
   "display": "id",
   "name": "id",
   "type": "INTEGER",
   "options": [],
 },
 {
   "display": "Address",
   "name": "address",
   "type": "TEXT",
   "options": [],
 },
 {
   "display": "Date (of arrival)",
   "name": "dateOfArrival",
   "type": "DATE",
   "options": [],
 },
 {
   "display": "discount percentage",
   "name": "discountPercentage",
   "type": "FLOAT",
   "options": [],
 },
]
```

#### Data endpoint example using standardised names
```json
{
  "id": 7,
  "address": "21 Newcourt Road",
  "dateOfArrival": "12/05/1994",
  "discountPercentage":  12.33
}
```


### **Filtering**

To allow users to query this otherwise static resource, the /data  endpoint's body should have the following shape:

```json
{
  "where": {
    <fieldName>: { <operator>: <value> },
  }
}
```

### 🧩 Filtering Details

When using the `/data` endpoint:

- **`fieldName`** — must match one of the **`name`** values from your derived schema.  
  ⚠️ *Do not use the original display name.*

- **`operator`** — defines how to compare values. Can be one of:
  - `eq` → equal to  
  - `lt` → less than  
  - `gt` → greater than  

- **`value`** — any valid value for the given field type.

---

#### 🧠 Example

The following request body should return all records where  
`discountPercentage` is **greater than 6**, assuming `itemNumber` is a valid field in the dataset:

```json
{
  "where": {
    "discountPercentage": { "gt": 6 }
  }
}

## 🗒️ Note

Your solution **does not need to store** any information in a database or any persistence layer.  
It’s okay for it to **start from scratch** each time the API runs.

The data is **intentionally poorly formatted**, as is often the case with 3rd-party datasets.  
Use your **best judgment** when deciding on the schema of the dataset.

Some fields may have **no values (nullable)** — you **don’t need** to differentiate between empty and non-existent values.  
Try to handle `null` values gracefully when filtering, but small edge cases are acceptable.

---

## 🌟 Extra Features (Optional)

If you have time, feel free to implement any of the following:

- ✅ Support querying by **multiple fields** at the same time in the `/data` endpoint  
- 🔄 Add an **`orderBy`** option to the `/data` request to control ordering and direction  
- 📄 Add **pagination** to the `/data` endpoint (limit, offset, page, etc.)  
- 🚫 Support a **`not`** query operator to negate nested filters  
- 🔍 Add endpoint: `GET /data/:id` – fetch a single station by unique ID  
- ❌ Add endpoint: `DELETE /data/:id` – delete a station by ID  
- ✏️ Add endpoint: `PATCH /data/:id` – update a station by ID  

---

## 🧭 Resources

Use the following URL to fetch the **Dublin Bikes station data**:  
👉 [https://app-media.noloco.app/noloco/dublin-bikes.json](https://app-media.noloco.app/noloco/dublin-bikes.json)

---

## 🎨 Design Guidelines

We encourage you to write **clean**, **concise**, and **modular** code —  
but above all, **the code should work.**

---

## ⚙️ Technology

- Noloco is built using **Node.js (TypeScript)**.  
- You can use **any language** you’re comfortable with — however, **JavaScript or TypeScript** is preferred.  
- You may use **any libraries or packages** you find useful.

---

## ⏱️ Time Constraints

Please spend **no more than 3 hours** on this task.

While you could easily spend much longer, we specifically want to see how you approach and prioritize within this time limit.  
If you don’t finish everything, include notes about what you **would have done next** in your submission.

---

## 🚀 Submission

When you’re done:

1. Upload your code to a **GitHub repository** (public or private).  
   - If private, invite **[@darraghmckay](https://github.com/darraghmckay)**.
2. Include the following:

   - 📘 A **README** file containing:
     - A short explanation of your solution  
     - Any technical choices you made  
     - Anything you would have done differently with more time  
   - 📸 A **screenshot or short Loom video** of your working solution  
   - 🧰 **Instructions** on how to run your solution  

3. When ready, **email** [darragh@noloco.io](mailto:darragh@noloco.io) to let us know you’ve completed it.

---


