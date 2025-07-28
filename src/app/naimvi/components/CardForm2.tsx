// // components/CardForm.tsx
// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { motion } from "framer-motion";

// export default function CardForm() {
//   const [saveCard, setSaveCard] = useState(true);

//   return (
//     <Card className="max-w-md mx-auto shadow-xl rounded-2xl p-6 border">
//       <CardContent className="space-y-5">
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold">Credit or debit card</h2>
//           <div className="flex gap-2">
//             <img src="/visa.svg" alt="Visa" className="h-5" />
//             <img src="/mastercard.svg" alt="Mastercard" className="h-5" />
//           </div>
//         </div>

//         <Input placeholder="Card Number" type="text" maxLength={19} />

//         <div className="flex gap-4">
//           <Input placeholder="MM/YY" className="w-1/2" />
//           <div className="relative w-1/2">
//             <Input placeholder="CVC" />
//             <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
//               🔒
//             </span>
//           </div>
//         </div>

//         <Input placeholder="Cardholder Name" />

//         <div className="flex items-start gap-3 mt-3">
//           <Checkbox
//             id="save-card"
//             checked={saveCard}
//             onCheckedChange={() => setSaveCard(!saveCard)}
//           />
//           <Label htmlFor="save-card" className="text-sm leading-snug">
//             <span className="font-medium">
//               Save this card for a faster checkout
//             </span>
//             <br />
//             By saving your card you grant us your consent to store your payment
//             method for future orders. You can withdraw consent at any time.{" "}
//             <br />
//             <a href="/privacy" className="text-pink-600 font-medium">
//               Privacy policy
//             </a>
//             .
//           </Label>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
