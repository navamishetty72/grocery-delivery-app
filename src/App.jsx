function App() {
  return (
    <div className="min-h-screen bg-[#F1E2D1] text-[#541A1A]">

      <nav className="bg-[#810B38] text-white px-8 py-4 shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">FreshMart</h1>

        <button className="bg-[#DCC3AA] text-[#541A1A] px-4 py-2 rounded-xl hover:scale-105 transition">
          Cart
        </button>
      </nav>

      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <p className="uppercase tracking-widest text-[#810B38] mb-4 font-semibold">
          Premium Grocery Delivery
        </p>

        <h2 className="text-5xl md:text-6xl font-bold max-w-4xl leading-tight mb-6">
          Fresh Groceries Delivered To Your Doorstep
        </h2>

        <p className="max-w-2xl text-lg mb-10 text-[#541A1A]/80">
          Shop premium fruits, vegetables, dairy products, snacks, and beverages
          with fast delivery and amazing offers.
        </p>

        <div className="flex gap-4">
          <button className="bg-[#810B38] text-white px-8 py-4 rounded-2xl hover:bg-[#541A1A] transition">
            Shop Now
          </button>

          <button className="border-2 border-[#810B38] text-[#810B38] px-8 py-4 rounded-2xl hover:bg-[#810B38] hover:text-white transition">
            Explore Deals
          </button>
        </div>

      </section>

    </div>
  )
}

export default App