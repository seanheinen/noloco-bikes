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

This endpoint returns the dataset after ap
