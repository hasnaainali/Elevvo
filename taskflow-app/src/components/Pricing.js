import React from "react";

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["Basic task management", "Limited features", "Single user"],
    },
    {
      name: "Pro",
      price: "$9/month",
      features: ["Unlimited tasks", "Collaboration tools", "Reminders & Notifications"],
    },
    {
      name: "Team",
      price: "$29/month",
      features: ["Team management", "Advanced analytics", "Priority support"],
    },
  ];

  return (
    <section id="pricing" className="py-16 px-6 md:px-16 lg:px-32 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="rounded-2xl shadow-lg p-8 bg-white dark:bg-gray-900 dark:text-white hover:scale-105 transition duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
            <p className="text-3xl font-bold mb-6">{plan.price}</p>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  ✔ <span className="ml-2">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <button className="py-2 px-6 rounded-lg bg-[#059669] text-white hover:bg-[#047857] transition">
                Choose {plan.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
