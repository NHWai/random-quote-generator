# Random Quote Generator
The **Random Quote Generator** project is created according to the assignment from **Anbuchi Technology**.
<br>
<br>

![Preview](https://plus.unsplash.com/premium_photo-1697211174198-18da849f87c6?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

### 🔗 **Live preview** of the project is [here](https://random-quote-generator-five-delta.vercel.app/).

## **Features**
* Get Random Quotes
* Save Favourite Quotes
* Share your favourite quote to other social media

## **Project Work Flow**
* Hit Next Button => If the current index is in the array, show the next quote in array if not fetch random quote from backend, add to the array and show it.
* Hit Prev Button => Ensure to show the previous quote first whether you are in the array or jump to random quotes.
* Hit the Quote Card => fetch random quote from backend. 

## **Outcome**
* Used **React**
* Used **Tailwind**
* Used **Redux Toolkit** with function based approach.
* Used **React Slick** for carousel.
* Learned data fetching concept.
* Learned conditional rendering.
* Learned importance of Redux store structure.
* Learned reuseable UI components with Tailwind.

## **Getting Started**
```
HTTPS - git clone https://github.com/NHWai/random-quote-generator.git

cd random-quote-generator

npm install

touch .env.local

./.env.local => NEXT_PUBLIC_BASE_URL=https://api.adviceslip.com

npm run dev
```

