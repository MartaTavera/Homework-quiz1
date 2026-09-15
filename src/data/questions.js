// ─── NON-CALCULATOR PAPER (sec: "A") ────────────────────────────────────────
// New types used below:
//   "order"   – drag/drop or fill 4 blanks in order
//   "multi"   – tick all that apply (array answer)
//   "twonumber" – already exists (quotient + remainder)
//   "table"   – fill missing cells in a table

export const questions = [

  // ═══════════════════════════════════════════════════════════════════
  // SECTION A – Non-calculator (3 questions)
  // ═══════════════════════════════════════════════════════════════════

 // SECTION A – Non-calculator (3 questions)

{
id: "A1",
sec: "A",
marks: 1,
type: "number",
text: "Lucy works in a furniture shop.\n\nShe wants to know how many hours she works each week.\n\nComplete the calculation.\n\n7 × 5 = ",
answer: 35,
displayAnswer: "35",
hint: "Multiply 7 by 5.",
explanation: "7 × 5 = 35 hours per week."
},

{
id: "A2",
sec: "A",
marks: 3,
type: "yesno",
text: "Lucy has 5 weeks of holidays in the year.\n\nShe will work for all the other weeks in the year.\n\nLucy says she will work for 43 weeks in the year.\n\nIs Lucy correct?\n\nShow why you think this.",
answer: "Yes",
displayAnswer: "Yes",
hint: "There are 52 weeks in a year. Subtract the 5 weeks of holiday.",
explanation: "52 - 5 = 47 weeks. Lucy would work 47 weeks, not 43 weeks. So Lucy is NOT correct. Answer: No."
},

{
id: "A3",
sec: "A",
marks: 3,
type: "twonumber",
labels: ["Number of shelves", "Brackets left over"],
text: "Lucy fits shelves in the shop.\n\nShe needs 4 brackets to fit each shelf.\n\nLucy has 58 brackets.\n\nHow many shelves can Lucy fit?\n\nShow how many brackets are left over.",
answer: [14, 2],
displayAnswer: "14 shelves, 2 brackets left over",
hint: "Divide 58 by 4. The answer tells you shelves. The remainder is brackets left over.",
explanation: "58 ÷ 4 = 14 remainder 2. So Lucy can fit 14 shelves with 2 brackets left over."
},

  // ═══════════════════════════════════════════════════════════════════
  // SECTION B – Calculator (15 questions, skip Q10)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "B1",
    sec: "B",
    marks: 1,
    type: "choice",
    image: "B1 – Clock Reading",
    imgSrc: "images/QB1.png",
    text: "Lucy wants to wake up before seven o'clock.\n\nWhat time will Lucy set her alarm clock to?\n\nTick (✓) the correct answer.",
    options: ["A", "B", "C", "D"],
    answer: "C",
    displayAnswer: "C",
    hint: "Look for the clock showing a time before 7 o'clock.",
    explanation: "Clock A shows 9:00. Clock B shows 1:00. Clock C shows before 7. Clock D shows 7:00. Answer is C."
  },

  {
    id: "B2",
    sec: "B",
    marks: 1,
    type: "text",
    image: "B2 – Bus times",
    imgSrc: "images/QB2.png",
    text: "Lucy looks at the waiting times for buses.\n\nLucy takes a bus to the station. She takes the bus with the least waiting time.\n\nWhich bus does Lucy take?",
    answer: "8",
    displayAnswer: "Bus 8",
    normalize: v => v.trim().toLowerCase().replace(/\s/g, ""),
    check: v => v === "8" || v === "bus8",
    hint: "Find buses going to the station. Which has the smallest waiting time?",
    explanation: "Buses to station: Bus 4 (20 min), Bus 8 (9 min), Bus 13 (14 min). Bus 8 has the least waiting time."
  },

  {
    id: "B3",
    sec: "B",
    marks: 1,
    type: "number",
    image: "B3 – Rail Ticket Cost Chart",
    imgSrc: "images/QB3.png",
    text: "Lucy compares the costs of rail and bus tickets.\n\nThe chart shows the cost of rail tickets.\n\nLucy pays £11 for an adult week bus ticket.\n\nHow much less does Lucy pay for an adult week bus ticket than an adult week rail ticket?",
    answer: 16,
    displayAnswer: "£16",
    hint: "Read the adult week rail ticket cost from the chart. Subtract £11.",
    explanation: "Adult week rail ticket costs £27. £27 - £11 = £16"
  },

  {
    id: "B4",
    sec: "B",
    marks: 1,
    type: "choice",
    text: "Lucy pays for her travel. She works out how much money is left over.\n\nShe does this calculation:\n\n154 − 29 ___ 125\n\nWhat is the missing symbol?\n\nTick (✓) the correct answer.",
    options: ["+", "=", "×", "÷"],
    answer: "=",
    displayAnswer: "=",
    hint: "Work out 154 − 29 and see what it equals.",
    explanation: "154 − 29 = 125, so the missing symbol is = (equals)."
  },

  {
    id: "B5",
    sec: "B",
    marks: 1,
    type: "number",
    image: "B5 – Pyramid Shape",
    imgSrc: "images/QB5.png",
    text: "Lucy sells lamps in the shape of a pyramid.\n\nHow many corners does the base of the pyramid have?",
    answer: 4,
    displayAnswer: "4",
    hint: "Look at the base of the pyramid. Count the corners.",
    explanation: "A pyramid has a square base. A square has 4 corners."
  },

  {
    id: "B6",
    sec: "B",
    marks: 3,
    type: "number",
    image: "B6 – Measuring Scale",
    imgSrc: "images/QB6.png",
    text: "Lucy puts a lamp into a box.\n\nThe arrow shows how tall the lamp is.\n\nThe box is 6 cm taller than the lamp.\n\nHow tall is the box to the nearest division?\n\nUse the correct unit.",
    answer: 95,
    displayAnswer: "95 cm",
    hint: "Read where the arrow points on the scale. Add 6 cm to that measurement.",
    explanation: "The lamp measures 89 cm (where the arrow points). 89 + 6 = 95 cm."
  },

  {
    id: "B7",
    sec: "B",
    marks: 1,
    type: "choice",
    image: "B7 – Shape Selection",
    imgSrc: "images/QB7.png",
    text: "Lucy sells a table. The top of the table is a hexagon.\n\nWhich shape is a hexagon?\n\nTick (✓) the correct answer.",
    options: ["A", "B", "C", "D", "E", "F"],
    answer: "C",
    displayAnswer: "C",
    hint: "A hexagon has 6 sides.",
    explanation: "A hexagon is the shape with 6 sides. Option C shows a hexagon."
  },

  {
    id: "B8",
    sec: "B",
    marks: 2,
    type: "yesno",
    image: "B8 – Trolley and Weights",
    imgSrc: "images/QB8.png",
    text: "Lucy puts one box on a trolley.\n\nThe box on the trolley has a weight of 27 kg.\n\nThe most weight the trolley can take is 50 kg.\n\nShe has another box with a weight of 19 kg.\n\nCan the trolley take the weight of both boxes?\n\nShow why you think this.",
    answer: "Yes",
    displayAnswer: "Yes",
    hint: "Add the two box weights together. Compare to the maximum weight of 50 kg.",
    explanation: "27 + 19 = 46 kg. 46 kg is less than 50 kg, so yes, the trolley can take both boxes."
  },

  {
    id: "B9a",
    sec: "B",
    marks: 1,
    type: "number",
    text: "Round 27 to the nearest 10.",
    answer: 30,
    displayAnswer: "30",
    hint: "Is 27 closer to 20 or 30?",
    explanation: "27 is closer to 30 than to 20, so rounded to nearest 10 it is 30."
  },

  {
    id: "B9b",
    sec: "B",
    marks: 1,
    type: "number",
    text: "Use the rounded number to check your answer to question 8.",
    answer: 49,
    displayAnswer: "49 kg",
    hint: "Use 30 instead of 27. Add it to 19.",
    explanation: "30 + 19 = 49 kg. This is approximately 50 kg, which confirms the trolley can take both boxes."
  },

  {
    id: "B11",
    sec: "B",
    marks: 3,
    type: "number",
    text: "A customer pays Lucy for 6 coat hooks.\n\ncoat hook – 12p each\n\nHow much does the customer pay in total?\n\nUse the correct symbol for money.",
    answer: "0.72",
    displayAnswer: "£0.72",
    hint: "Multiply 6 by 12p.",
    explanation: "6 × 12p = 72p = £0.72"
  },

  {
    id: "B12",
    sec: "B",
    marks: 1,
    type: "number",
    image: "B12 – Cupboards Table",
    imgSrc: "images/QB12.png",
    text: "Lucy has information about cupboards for sale.\n\nLucy looks for a grey cupboard with more than 3 drawers.\n\nHow much will she spend?",
    answer: 112,
    displayAnswer: "£112",
    hint: "Find the grey cupboards. Look for the one with more than 3 drawers.",
    explanation: "Looking at the table: grey cupboards are 2 drawers (£132), 4 drawers (£112), and 3 drawers (£105). The one with more than 3 drawers is the 4-drawer cupboard at £112."
  },

  {
    id: "B13",
    sec: "B",
    marks: 1,
    type: "choice",
    image: "B13 – Home Deliveries Diagram",
    imgSrc: "images/QB13.png",
    text: "Lucy looks at a diagram about home deliveries.\n\nThe first morning home delivery is nearest to the shop.\n\nWhich morning home delivery is first?\n\nTick (✓) to show the answer on the diagram.",
    options: ["A", "C", "B"],
    answer: "C",
    displayAnswer: "C",
    hint: "Find which morning delivery (empty house symbol) is closest to the shop (filled circle).",
    explanation: "C is the morning home delivery that is nearest to the shop."
  },

  {
    id: "B14",
    sec: "B",
    marks: 1,
    type: "number",
    image: "B14 – Furniture Deliveries Chart",
    imgSrc: "images/QB14a.png",
    text: "Lucy counts the furniture deliveries she makes.\n\nItem of furniture – Number of deliveries\nsofa – 10\nbed – 17\ncupboard – 8\ntable – 21\n\nLucy needs a bar chart to show the information.\n\nShow the number of deliveries of tables on the chart.",
    answer: 21,
    displayAnswer: "21",
    hint: "Find the number of table deliveries from the data and draw the bar to that height on the chart.",
    explanation: "The table shows 21 deliveries of tables. Draw a bar up to 21 on the chart."
  },

  {
    id: "B15",
    sec: "B",
    marks: 1,
    type: "choice",
    text: "Lucy buys hot food for lunch.\n\nShe wants to pay less than £5\n\nWhich food will Lucy buy?\n\nTick (✓) the correct answer.",
    options: ["Sandwich (cold, £3)", "Pie (hot, £4)", "Curry (hot, £6)", "Salad (cold, £4)", "Pizza (hot, £8)", "Pasta (cold, £4)"],
    answer: "Pie (hot, £4)",
    displayAnswer: "Pie",
    hint: "Find the hot foods that cost less than £5.",
    explanation: "Hot foods: Pie (£4) ✓, Curry (£6) ✗, Pizza (£8) ✗. Only Pie is hot AND less than £5."
  }
];

export default questions;