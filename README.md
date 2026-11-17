# Maharashtra Dairy — MERN Website

Website for **Maharashtra Dairy (महाराष्ट्र डेयरी)**, Valsang, District Solapur, Maharashtra.
Built with **MongoDB, Express, React (Vite) and Node.js**.

## Pages
1. **Home** – hero, highlights, product range, farm-to-table journey
2. **About Us** – story, values, mission & vision
3. **Products** – fresh milk + by-products (dahi, malai, chaas, lassi, ghee, butter, paneer, shrikhand) loaded from the API
4. **Quality & Hygiene** – safety & hygiene norms, farm-to-table process, purity promise
5. **Contact** – address, phone, email, WhatsApp, enquiry form (saved to MongoDB), map

## Project structure
```
maharashtra-dairy/
├── server/            Express + Mongoose API
│   ├── models/        Product, Contact
│   ├── routes/        /api/products, /api/contact
│   ├── data/          product data + seed script
│   └── server.js
└── client/            React (Vite) front end
    ├── public/logo.png
    └── src/ (components, pages, data, index.css)
```

## Requirements
- Node.js 18+
- MongoDB (local install or a free MongoDB Atlas cluster)

## Run locally
```bash
# 1. Backend
cd server
npm install
cp .env.example .env        # edit MONGO_URI if using Atlas
npm run seed                # load products into MongoDB (optional)
npm run dev                 # API on http://localhost:5002

# 2. Frontend (new terminal)
cd client
npm install
npm run dev                 # site on http://localhost:5173
```
The Vite dev server proxies `/api` to the backend.
The Products page still works if the API is offline (it uses built-in data); the contact form needs MongoDB.

## Production
```bash
cd client && npm run build
cd ../server && npm start   # serves the built site + API on port 5002
```

## API
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products?category=milk\|byproduct` | List products |
| POST | `/api/contact` | Save an enquiry `{ name, email, phone, subject, message }` |
| GET | `/api/contact` | List the latest 100 enquiries |
| GET | `/api/health` | Server / DB status |

## Theme colours (from the logo)
| Navy | Terracotta | Gold | Leaf green | Cream |
|---|---|---|---|---|
| `#1e3f6e` | `#c8692a` | `#d9a441` | `#5b8a3c` | `#f6efe0` |

## Contact
- 📍 Valsang Taluka, District Solapur, Maharashtra
- 📞 +91-9930022119
- ✉️ bmainuddin30@gmail.com
