const tasks = [
  {
    id: 1,
    title: "თასქი 1 — რთული (მასივებთან მუშაობა)",
    maxScore: 25,
    variants: [
      {
        id: "A",
        name: "პროდუქტების ანალიზი",
        dataCode: `const products = [
  { name: "ლეპტოპი", price: 2500, category: "ელექტრონიკა", quantity: 3 },
  { name: "მაისური", price: 45, category: "ტანსაცმელი", quantity: 10 },
  { name: "ყურსასმენი", price: 120, category: "ელექტრონიკა", quantity: 5 },
  { name: "შარვალი", price: 89, category: "ტანსაცმელი", quantity: 7 },
  { name: "ტელეფონი", price: 1800, category: "ელექტრონიკა", quantity: 2 },
  { name: "წიგნი", price: 35, category: "განათლება", quantity: 15 },
];`,
        description: `დაწერე ფუნქცია რომელიც:
• გამოთვლის საერთო ღირებულებას (ფასი × რაოდენობა)
• დააბრუნებს მხოლოდ 100 ლარზე ძვირ პროდუქტებს
• დაალაგებს ფასის მიხედვით კლებადობით
• გამოიტანს console.log-ით ყველაზე ძვირი პროდუქტის სახელს`,
        checks: [
          { pattern: /price\s*\*\s*quantity|quantity\s*\*\s*price/, weight: 5 },
          { pattern: /\.filter\s*\(/, weight: 5 },
          { pattern: /\.sort\s*\(/, weight: 4 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /price\s*>\s*100|price\s*>=\s*100/, weight: 4 },
          { pattern: /\.reduce\s*\(|forEach|\.map\s*\(/, weight: 4 },
        ],
      },
      {
        id: "B",
        name: "სტუდენტების ანალიზი",
        dataCode: `const students = [
  { name: "გიორგი", grades: [85, 90, 78, 92], course: 1 },
  { name: "მარიამი", grades: [60, 55, 70, 65], course: 2 },
  { name: "დავითი", grades: [95, 98, 100, 92], course: 1 },
  { name: "ნინო", grades: [40, 55, 48, 60], course: 3 },
  { name: "ლუკა", grades: [75, 80, 72, 88], course: 2 },
  { name: "სოფო", grades: [91, 87, 93, 96], course: 3 },
];`,
        description: `დაწერე ფუნქცია რომელიც:
• გამოთვლის თითოეული სტუდენტის საშუალო ქულას
• დააბრუნებს მხოლოდ 70-ზე მეტი საშუალო ქულის მქონე სტუდენტებს
• დაალაგებს საშუალო ქულის მიხედვით კლებადობით
• გამოიტანს console.log-ით საუკეთესო სტუდენტის სახელს`,
        checks: [
          { pattern: /\.reduce\s*\(/, weight: 5 },
          { pattern: /\.filter\s*\(/, weight: 5 },
          { pattern: /\.sort\s*\(/, weight: 4 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /grades\.length|\.length/, weight: 4 },
          { pattern: /\.map\s*\(/, weight: 4 },
        ],
      },
      {
        id: "C",
        name: "შეკვეთების ანალიზი",
        dataCode: `const orders = [
  { id: 1, user: "გიორგი", products: ["ლეპტოპი", "მაუსი"], status: "დასრულებული" },
  { id: 2, user: "მარიამი", products: ["ტელეფონი"], status: "მიმდინარე" },
  { id: 3, user: "გიორგი", products: ["ყურსასმენი", "დამტენი", "ქეისი"], status: "დასრულებული" },
  { id: 4, user: "დავითი", products: ["პლანშეტი", "კლავიატურა"], status: "გაუქმებული" },
  { id: 5, user: "მარიამი", products: ["საათი"], status: "დასრულებული" },
  { id: 6, user: "დავითი", products: ["კამერა", "მეხსიერება"], status: "დასრულებული" },
];`,
        description: `დაწერე ფუნქცია რომელიც:
• დათვლის რამდენი შეკვეთაა "დასრულებული" სტატუსით
• გამოთვლის დასრულებული შეკვეთების საერთო პროდუქტების რაოდენობას
• გამოიტანს console.log-ით თითოეული მომხმარებლის სახელს და მათი შეკვეთების რაოდენობას`,
        checks: [
          { pattern: /\.filter\s*\(/, weight: 5 },
          { pattern: /დასრულებული|"დასრულებული"/, weight: 4 },
          { pattern: /\.length/, weight: 3 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /\.reduce\s*\(|forEach/, weight: 5 },
          { pattern: /products\.length|\.flat\s*\(/, weight: 5 },
        ],
      },
      {
        id: "D",
        name: "ფილმების ანალიზი",
        dataCode: `const movies = [
  { name: "გამარჯვება", year: 2021, genre: "დრამა", rating: 8.5 },
  { name: "სიცილი", year: 2019, genre: "კომედია", rating: 6.2 },
  { name: "ჩრდილი", year: 2023, genre: "საშინელება", rating: 7.1 },
  { name: "გზა", year: 2020, genre: "დრამა", rating: 9.1 },
  { name: "ცეკვა", year: 2022, genre: "კომედია", rating: 5.8 },
  { name: "ღამე", year: 2021, genre: "საშინელება", rating: 6.9 },
  { name: "სიყვარული", year: 2023, genre: "დრამა", rating: 7.8 },
];`,
        description: `დაწერე ფუნქცია რომელიც:
• დააჯგუფებს ფილმებს ჟანრის მიხედვით
• გამოთვლის თითოეული ჟანრის საშუალო რეიტინგს
• გამოიტანს console.log-ით ყველაზე მაღალი საშუალო რეიტინგის ჟანრს`,
        checks: [
          { pattern: /\.reduce\s*\(|forEach/, weight: 5 },
          { pattern: /genre/, weight: 3 },
          { pattern: /rating/, weight: 3 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /\.length/, weight: 3 },
          { pattern: /Object\.keys|Object\.entries|for\s*\(.*\s+in\s+/, weight: 4 },
          { pattern: /Math\.max|sort/, weight: 4 },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "თასქი 2 — საშუალო (ობიექტებთან მუშაობა)",
    maxScore: 25,
    variants: [
      {
        id: "A",
        name: "მომხმარებლის ანგარიში",
        dataCode: `const user = {
  name: "გიორგი",
  surname: "კვარაცხელია",
  age: 17,
  city: "თბილისი",
  account: {
    balance: 1500,
    currency: "GEL",
    transactions: [200, -50, -30, 500, -120, -80],
  },
};`,
        description: `დაწერე ფუნქციები:
• getFullName — აბრუნებს სრულ სახელს
• isAdult — ამოწმებს 18+ ასაკს
• getTotalSpent — ითვლის ყველა უარყოფითი ტრანზაქციის ჯამს
• hasEnoughBalance — იღებს თანხას და ამოწმებს ბალანსი ეყოფა თუ არა
გამოიტანე console.log-ით ყველა შედეგი.`,
        checks: [
          { pattern: /function\s+getFullName|const\s+getFullName/, weight: 4 },
          { pattern: /function\s+isAdult|const\s+isAdult/, weight: 4 },
          { pattern: /function\s+getTotalSpent|const\s+getTotalSpent/, weight: 5 },
          { pattern: /function\s+hasEnoughBalance|const\s+hasEnoughBalance/, weight: 5 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /\.filter\s*\(|<\s*0/, weight: 4 },
        ],
      },
      {
        id: "B",
        name: "კომპანიის ანალიზი",
        dataCode: `const company = {
  name: "TechGe",
  founded: 2015,
  departments: ["განვითარება", "დიზაინი", "მარკეტინგი"],
  employees: [
    { name: "ნინო", department: "განვითარება", salary: 3500 },
    { name: "გიორგი", department: "დიზაინი", salary: 2800 },
    { name: "დავითი", department: "განვითარება", salary: 4200 },
    { name: "მარიამი", department: "მარკეტინგი", salary: 2500 },
    { name: "ლუკა", department: "განვითარება", salary: 3900 },
  ],
};`,
        description: `დაწერე ფუნქციები:
• getAverageSalary — საშუალო ხელფასი
• getHighestPaid — ყველაზე მაღალანაზღაურებადი თანამშრომელი
• getByDepartment — განყოფილების მიხედვით გაფილტვრა
• getCompanyAge — კომპანიის ასაკი
გამოიტანე console.log-ით ყველა შედეგი.`,
        checks: [
          { pattern: /function\s+getAverageSalary|const\s+getAverageSalary/, weight: 5 },
          { pattern: /function\s+getHighestPaid|const\s+getHighestPaid/, weight: 4 },
          { pattern: /function\s+getByDepartment|const\s+getByDepartment/, weight: 5 },
          { pattern: /function\s+getCompanyAge|const\s+getCompanyAge/, weight: 4 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /\.reduce\s*\(|\.filter\s*\(|Math\.max/, weight: 4 },
        ],
      },
      {
        id: "C",
        name: "მაღაზიის მართვა",
        dataCode: `const store = {
  name: "სუპერმარკეტი",
  address: "რუსთაველის 10",
  products: [
    { name: "რძე", price: 4.5, category: "რძის", stock: 20 },
    { name: "პური", price: 2.0, category: "საცხობი", stock: 0 },
    { name: "ყველი", price: 12.0, category: "რძის", stock: 8 },
    { name: "ვაშლი", price: 3.5, category: "ხილი", stock: 50 },
    { name: "შოკოლადი", price: 8.0, category: "ტკბილეული", stock: 0 },
    { name: "მანდარინი", price: 5.0, category: "ხილი", stock: 30 },
  ],
};`,
        description: `დაწერე ფუნქციები:
• isInStock — იღებს სახელს და ამოწმებს მარაგს
• getCategoryProducts — კატეგორიის პროდუქტები
• getTotalInventoryValue — მარაგის საერთო ღირებულება (ფასი × stock)
• getMostExpensive — ყველაზე ძვირი პროდუქტი
გამოიტანე console.log-ით ყველა შედეგი.`,
        checks: [
          { pattern: /function\s+isInStock|const\s+isInStock/, weight: 5 },
          { pattern: /function\s+getCategoryProducts|const\s+getCategoryProducts/, weight: 4 },
          { pattern: /function\s+getTotalInventoryValue|const\s+getTotalInventoryValue/, weight: 5 },
          { pattern: /function\s+getMostExpensive|const\s+getMostExpensive/, weight: 4 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /\.filter\s*\(|\.find\s*\(|\.reduce\s*\(/, weight: 4 },
        ],
      },
      {
        id: "D",
        name: "სკოლის მართვა",
        dataCode: `const school = {
  name: "სკოლა №42",
  address: "ვაკე, თბილისი",
  classes: [
    { name: "10A", teacher: "მასწავლებელი ბერიძე", students: 28, subjects: ["მათემატიკა", "ფიზიკა", "ქიმია"] },
    { name: "10B", teacher: "მასწავლებელი კვარაცხელია", students: 34, subjects: ["ისტორია", "გეოგრაფია"] },
    { name: "11A", teacher: "მასწავლებელი ბერიძე", students: 25, subjects: ["მათემატიკა", "ბიოლოგია"] },
    { name: "11B", teacher: "მასწავლებელი ჯავახიშვილი", students: 30, subjects: ["ლიტერატურა", "ინგლისური"] },
  ],
};`,
        description: `დაწერე ფუნქციები:
• getTotalStudents — მოსწავლეების ჯამი
• getLargestClass — ყველაზე მეტი მოსწავლის კლასი
• getClassByTeacher — მასწავლებლის მიხედვით კლასები
• hasSubject — ამოწმებს საგნის არსებობას ნებისმიერ კლასში
გამოიტანე console.log-ით ყველა შედეგი.`,
        checks: [
          { pattern: /function\s+getTotalStudents|const\s+getTotalStudents/, weight: 5 },
          { pattern: /function\s+getLargestClass|const\s+getLargestClass/, weight: 4 },
          { pattern: /function\s+getClassByTeacher|const\s+getClassByTeacher/, weight: 5 },
          { pattern: /function\s+hasSubject|const\s+hasSubject/, weight: 4 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /\.reduce\s*\(|\.filter\s*\(|\.some\s*\(|\.find\s*\(/, weight: 4 },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "თასქი 3 — საშუალო (სტრინგებთან მუშაობა)",
    maxScore: 25,
    variants: [
      {
        id: "A",
        name: "ტექსტის ანალიზი",
        dataCode: `const text = "გიორგი სკოლაში მიდის. მარიამი სახლში რჩება! რატომ არ მოდის დავითი? ნინო ყოველდღე დადის სკოლაში. სოფო კი სახლში რჩება.";`,
        description: `დაწერე ფუნქცია analyzeText რომელიც:
• ითვლის სიტყვების რაოდენობას
• ითვლის წინადადებების რაოდენობას (. ! ?)
• პოულობს ყველაზე გრძელ სიტყვას
• ითვლის რამდენჯერ გვხვდება "სკოლა" სიტყვა
გამოიტანე console.log-ით ყველა შედეგი.`,
        checks: [
          { pattern: /function\s+analyzeText|const\s+analyzeText/, weight: 5 },
          { pattern: /\.split\s*\(/, weight: 5 },
          { pattern: /\.length/, weight: 3 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /\.match\s*\(|\.replace\s*\(|\.filter\s*\(/, weight: 5 },
          { pattern: /სკოლა/, weight: 4 },
        ],
      },
      {
        id: "B",
        name: "სტრინგ ფუნქციები",
        dataCode: `const testCases = {
  capitalize: "hello world",
  camelToSnake: "myVariableName",
  countOccurrences: { text: "the cat sat on the mat by the hat", word: "the" },
  truncate: { text: "JavaScript არის პროგრამირების ენა", maxLength: 15 },
};`,
        description: `დაწერე ფუნქციები:
• capitalize — პირველ ასოს ადიდებს
• camelToSnake — camelCase-ს snake_case-ად გარდაქმნის
• countOccurrences — ითვლის სიტყვის გამეორებას
• truncate — ამოკლებს სტრინგს და ბოლოს "..." უმატებს
გამოიტანე console.log-ით ყველა შედეგი.`,
        checks: [
          { pattern: /function\s+capitalize|const\s+capitalize/, weight: 5 },
          { pattern: /function\s+camelToSnake|const\s+camelToSnake/, weight: 5 },
          { pattern: /function\s+countOccurrences|const\s+countOccurrences/, weight: 4 },
          { pattern: /function\s+truncate|const\s+truncate/, weight: 4 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /\.replace\s*\(|\.split\s*\(|\.toUpperCase\s*\(|\.slice\s*\(/, weight: 4 },
        ],
      },
      {
        id: "C",
        name: "ვალიდაცია",
        dataCode: `const testData = {
  emails: ["user@gmail.com", "invalid-email", "test@yahoo.com", "wrong@", "hello@mail.ge"],
  passwords: ["abc", "password123", "MyPass1", "12345678", "StrongPass9"],
};`,
        description: `დაწერე ფუნქციები:
• isValidEmail — ამოწმებს @ და . -ის სწორ მდებარეობას
• isStrongPassword — ამოწმებს 8+ სიმბოლოს, ციფრის და დიდი ასოს არსებობას
• maskEmail — მალავს სახელის ნაწილს (us***@gmail.com)
• getDomain — ამოიღებს დომეინს
გამოიტანე console.log-ით ყველა შედეგი.`,
        checks: [
          { pattern: /function\s+isValidEmail|const\s+isValidEmail/, weight: 5 },
          { pattern: /function\s+isStrongPassword|const\s+isStrongPassword/, weight: 5 },
          { pattern: /function\s+maskEmail|const\s+maskEmail/, weight: 4 },
          { pattern: /function\s+getDomain|const\s+getDomain/, weight: 4 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /@|\.includes\s*\(|\.split\s*\(|\.test\s*\(/, weight: 4 },
        ],
      },
      {
        id: "D",
        name: "სტრინგ ალგორითმები",
        dataCode: `const testStrings = {
  palindromes: ["racecar", "hello", "A man a plan a canal Panama", "world", "level"],
  sentences: [
    "JavaScript is awesome",
    "I love coding every day",
    "React is a great library",
  ],
};`,
        description: `დაწერე ფუნქციები:
• isPalindrome — ამოწმებს პალინდრომს (სივრცეებისა და რეგისტრის გარეშე)
• reverseWords — სიტყვების მიმდევრობას ბრუნავს
• countUniqueWords — ითვლის უნიკალურ სიტყვებს
• longestWord — პოულობს ყველაზე გრძელ სიტყვას
გამოიტანე console.log-ით ყველა შედეგი.`,
        checks: [
          { pattern: /function\s+isPalindrome|const\s+isPalindrome/, weight: 5 },
          { pattern: /function\s+reverseWords|const\s+reverseWords/, weight: 5 },
          { pattern: /function\s+countUniqueWords|const\s+countUniqueWords/, weight: 4 },
          { pattern: /function\s+longestWord|const\s+longestWord/, weight: 4 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /\.split\s*\(|\.reverse\s*\(|\.join\s*\(|\.toLowerCase\s*\(/, weight: 4 },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "თასქი 4 — რთული (ES6+ კომბინირებულად)",
    maxScore: 25,
    variants: [
      {
        id: "A",
        name: "შეკვეთების გაერთიანება",
        dataCode: `const users = [
  { id: 1, name: "გიორგი", city: "თბილისი" },
  { id: 2, name: "მარიამი", city: "ბათუმი" },
  { id: 3, name: "დავითი", city: "თბილისი" },
  { id: 4, name: "ნინო", city: "ქუთაისი" },
];

const orders = [
  { id: 1, userId: 1, product: "ლეპტოპი", price: 2500, status: "დასრულებული" },
  { id: 2, userId: 2, product: "ტელეფონი", price: 1800, status: "მიმდინარე" },
  { id: 3, userId: 1, product: "ყურსასმენი", price: 120, status: "დასრულებული" },
  { id: 4, userId: 3, product: "პლანშეტი", price: 950, status: "დასრულებული" },
  { id: 5, userId: 2, product: "საათი", price: 350, status: "დასრულებული" },
  { id: 6, userId: 4, product: "კამერა", price: 780, status: "გაუქმებული" },
];`,
        description: `Destructuring-ითა და spread-ით:
• გააერთიანე მასივები userId-ს მიხედვით
• გამოთვლე თითოეული მომხმარებლის დახარჯული თანხა (მხოლოდ "დასრულებული")
• დააბრუნე ქალაქების მიხედვით დაჯგუფებული შედეგი
გამოიტანე console.log-ით.`,
        checks: [
          { pattern: /\.\.\./, weight: 5 },
          { pattern: /const\s*\{|let\s*\{|\{\s*\w+\s*(,\s*\w+)*\s*\}/, weight: 5 },
          { pattern: /\.filter\s*\(/, weight: 4 },
          { pattern: /\.reduce\s*\(|\.map\s*\(/, weight: 4 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /userId/, weight: 4 },
        ],
      },
      {
        id: "B",
        name: "თანამშრომლების ანალიზი",
        dataCode: `const employees = [
  { id: 1, name: "ნინო", department: "განვითარება", salary: 3500, skills: ["JavaScript", "React", "CSS"] },
  { id: 2, name: "გიორგი", department: "დიზაინი", salary: 2800, skills: ["Figma", "CSS", "Photoshop"] },
  { id: 3, name: "დავითი", department: "განვითარება", salary: 5500, skills: ["JavaScript", "Node.js", "Python"] },
  { id: 4, name: "მარიამი", department: "მარკეტინგი", salary: 2200, skills: ["SEO", "Google Ads"] },
  { id: 5, name: "ლუკა", department: "განვითარება", salary: 4200, skills: ["React", "TypeScript", "Node.js"] },
];`,
        description: `Destructuring-ითა და spread-ით:
• გაერთიანე ყველა უნიკალური skill ერთ მასივში
• გამოთვლე განყოფილებების საშუალო ხელფასი
• დაამატე თითოეულ თანამშრომელს seniorityLevel (3000-ზე ნაკლები — junior, 3000-4500 — mid, 4500+ — senior)
გამოიტანე console.log-ით.`,
        checks: [
          { pattern: /\.\.\./, weight: 5 },
          { pattern: /const\s*\{|let\s*\{|\{\s*\w+\s*(,\s*\w+)*\s*\}/, weight: 5 },
          { pattern: /new Set|Set\s*\(/, weight: 4 },
          { pattern: /seniorityLevel|junior|mid|senior/, weight: 4 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /\.map\s*\(|\.reduce\s*\(/, weight: 4 },
        ],
      },
      {
        id: "C",
        name: "ფინანსური ანალიზი",
        dataCode: `const transactions = [
  { id: 1, date: "2024-01-10", type: "income", amount: 3000, category: "ხელფასი" },
  { id: 2, date: "2024-01-15", type: "expense", amount: 150, category: "საკვები" },
  { id: 3, date: "2024-02-01", type: "income", amount: 500, category: "ფრილანსი" },
  { id: 4, date: "2024-02-10", type: "expense", amount: 800, category: "კომუნალური" },
  { id: 5, date: "2024-02-20", type: "expense", amount: 200, category: "საკვები" },
  { id: 6, date: "2024-03-01", type: "income", amount: 3000, category: "ხელფასი" },
  { id: 7, date: "2024-03-05", type: "expense", amount: 450, category: "გართობა" },
];`,
        description: `Destructuring-ითა და spread-ით:
• გამოთვლე სულ შემოსავალი და სულ გასავალი
• დაჯგუფე კატეგორიის მიხედვით თანხების ჯამი
• დააბრუნე ბოლო 3 ტრანზაქცია თარიღის მიხედვით
გამოიტანე console.log-ით.`,
        checks: [
          { pattern: /\.\.\./, weight: 5 },
          { pattern: /const\s*\{|let\s*\{|\{\s*\w+\s*(,\s*\w+)*\s*\}/, weight: 5 },
          { pattern: /income|expense/, weight: 4 },
          { pattern: /\.reduce\s*\(/, weight: 4 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /\.sort\s*\(|\.slice\s*\(/, weight: 4 },
        ],
      },
      {
        id: "D",
        name: "კურსების ანალიზი",
        dataCode: `const courses = [
  {
    id: 1, name: "JavaScript", lecturer: "ბერიძე",
    students: [{ name: "გიორგი", grade: 85 }, { name: "მარიამი", grade: 92 }, { name: "დავითი", grade: 78 }],
  },
  {
    id: 2, name: "React", lecturer: "კვარაცხელია",
    students: [{ name: "ნინო", grade: 95 }, { name: "ლუკა", grade: 88 }, { name: "სოფო", grade: 91 }],
  },
  {
    id: 3, name: "Python", lecturer: "ბერიძე",
    students: [{ name: "გიორგი", grade: 70 }, { name: "ანა", grade: 65 }, { name: "ზურა", grade: 80 }],
  },
];`,
        description: `Destructuring-ითა და spread-ით:
• გამოთვლე თითოეული კურსის საშუალო ქულა
• გამოყავი ყველა სტუდენტი ყველა კურსიდან უნიკალურად (სახელის მიხედვით)
• დააბრუნე ლექტორების რეიტინგი მათი კურსების საშუალო ქულების მიხედვით
გამოიტანე console.log-ით.`,
        checks: [
          { pattern: /\.\.\./, weight: 5 },
          { pattern: /const\s*\{|let\s*\{|\{\s*\w+\s*(,\s*\w+)*\s*\}/, weight: 5 },
          { pattern: /\.reduce\s*\(|\.map\s*\(/, weight: 4 },
          { pattern: /\.flat\s*\(|\.flatMap\s*\(|\.concat\s*\(/, weight: 4 },
          { pattern: /console\.log/, weight: 3 },
          { pattern: /new Set|Set\s*\(|\.filter\s*\(/, weight: 4 },
        ],
      },
    ],
  },
];

export function getRandomVariants() {
  return tasks.map((task) => {
    const randomIndex = Math.floor(Math.random() * task.variants.length);
    return {
      ...task,
      selectedVariant: task.variants[randomIndex],
    };
  });
}

export function checkAnswer(variant, code) {
  if (!code || code.trim().length < 20) return 0;

  const totalWeight = variant.checks.reduce((sum, c) => sum + c.weight, 0);
  let earnedWeight = 0;

  for (const check of variant.checks) {
    if (check.pattern.test(code)) {
      earnedWeight += check.weight;
    }
    check.pattern.lastIndex = 0;
  }

  return Math.round((earnedWeight / totalWeight) * 25);
}

export function runCode(dataCode, userCode) {
  const logs = [];
  const originalLog = console.log;

  try {
    const captureLog = (...args) => {
      const formatted = args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
          try { return JSON.stringify(arg, null, 2); } catch { return String(arg); }
        }
        return String(arg);
      }).join(' ');
      logs.push({ type: 'log', text: formatted });
    };

    const fullCode = `
      ${dataCode}
      ${userCode}
    `;

    const fn = new Function('console', fullCode);
    fn({ log: captureLog, error: captureLog, warn: captureLog });

    return { logs, error: null };
  } catch (err) {
    logs.push({ type: 'error', text: `Error: ${err.message}` });
    return { logs, error: err.message };
  }
}

export default tasks;
