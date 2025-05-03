# Na Regua

[![Expo](https://img.shields.io/badge/Expo-✓-lightblue)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-✓-blue)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Na Regua** is a college project: a mobile app built with React Native, TypeScript, and Expo to manage all aspects of a barbershop.

## 📝 Description

Na Regua provides a unified system for administrators, barbers, and clients to:
- Manage employee registrations (Administrator and Barber roles)  
- Manage client registrations  
- Manage products and services with pricing and profit margins  
- View detailed financial reports  
- Schedule services (by administrators and clients)  

## 🚀 Technology Stack

- **React Native**  
- **TypeScript**  
- **Expo CLI**  
- **React Navigation**

## 📂 Project Structure

```
/NA-REGUA
├── .expo/               # Expo files
├── app/                 # Expo app entry
├── assets/              # Images, icons, and fonts
├── components/          # Reusable UI components
├── hooks/               # Custom hooks
├── themes/              # Styling themes
├── .gitignore           # Git ignore rules
├── app.json             # Expo configuration
├── expo-env.d.ts        # Expo environment types
├── LICENSE              # License file
├── package-lock.json    # Lock file for npm
├── package.json         # Project metadata & dependencies
├── README.md            # This file
└── tsconfig.json        # TypeScript configuration
```

## ⚙️ Features

1. **Employee Management**  
   - Register employees as "Administrator" or "Barber"  
2. **Client Registration & Login**  
   - Clients can sign up and log in  
3. **User Management**  
   - Administrators can edit and delete employees and clients  
4. **Product Management**  
   - Add, edit, and delete products with name, sale price, and profit  
5. **Service Management**  
   - Add, edit, and delete services with name, price, and duration  
6. **Financial Reports**  
   - View earnings by day, client, service, and product  
7. **Scheduling**  
   - Administrators: schedule appointments (client, service, barber, date, time)  
   - Barbers: view assigned appointments  
   - Clients: book appointments by selecting service, barber, and available slots  

## 🚀 Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/natanrizzo/na-regua.git
   cd na-regua
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Start Expo**  
   ```bash
   expo start
   ```

4. **Run on your device**  
   - Scan the QR code with Expo Go (iOS/Android)  
   - Or launch on an emulator/simulator  

## 📈 Usage Flow

- **Administrator**  
  1. Log in  
  2. Manage employees, products, and services  
  3. Access financial reports and create appointments  
- **Barber**  
  1. Log in  
  2. View assigned appointments  
- **Client**  
   1. Sign up and log in  
   2. Browse services and barbers  
   3. Create appointments  


## 🛡️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
