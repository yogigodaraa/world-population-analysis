# World Population Analysis

Web app that analyzes world population CSV data. Built as a university coursework project (CITS1401, UWA, Semester 1 2023).

## What it does

Upload a CSV of country population data, pick a region, and get:

- Min/max population countries (filtered by positive net change)
- Average and standard deviation of populations
- Population density rankings by country
- Pearson correlation coefficient between population and area

## Tech stack

- Node.js + Express 4
- Multer (file upload)
- Vanilla JS/HTML/CSS frontend
- Python 3 reference implementation also included (`Project 1.py`)

## Getting started

```bash
npm install
npm start              # http://localhost:3000
```

Upload a CSV through the form and select a region.

## API

- `POST /analyze` — multipart form with CSV file + `region` field; returns the computed stats

## Project structure

```
server.js                          Express server
analysis.js                        Server-side analysis
public/                            HTML + frontend JS
Project 1.py                       Python reference implementation
CITS1401 Project 1 Sem-1 2023.pdf  Assignment spec
```

## Status

Coursework submission. Functional but minimal. No tests. Not actively developed.
