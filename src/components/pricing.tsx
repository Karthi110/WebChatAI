import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MaxWidthWrapper from "./max-width-wrapper";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["1 webpage per month", "Limited chats", "Single url loader"],
    },
    {
      name: "Pro",
      price: "$19",
      features: [
        "50 Webpages per month",
        "1M chats for each Webpage",
        "Recursive url Loader",
        "Faster response",
      ],
    },
    // {
    //   name: "Plus",
    //   price: "$49",
    //   features: [
    //     "Unlimited pages",
    //     "Unlimited chat tokens",
    //     "fastest response with fast models",
    //     "Recursive url loader",
    //     "Control depth of recursive loading",
    //   ],
    // },
  ];

  return (
    <>
      <MaxWidthWrapper classname="mb-12 mt-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Pricing Plans
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Choose the plan that's right for you
        </p>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col justify-between ${
                plan.name === "Pro"
                  ? "border-2 border-dashed border-primary shadow-lg"
                  : ""
              }`}
            >
              <CardHeader>
                <CardTitle
                  className={plan.name === "Pro" ? "text-primary" : ""}
                >
                  {plan.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-3xl font-bold mb-4">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-600">
                    /month
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  className="w-full"
                  variant={plan.name === "Pro" ? "default" : "outline"}
                >
                  {plan.name === "Free" ? "Get Started" : "Subscribe"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  );
}
