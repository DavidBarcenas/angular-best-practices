# Factory - Creational Pattern

```js
interface User {
  name: string;
  email: string;
  password: string;
  role: Role
}

enum Role {
  Client, 
  Driver,  
  Owner,
}

class ConcreteUser implements User {
  name: string;
  email: string;
  password: string;
  role: Role;

  constructor(name: string, email: string, password: string, role: Role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role; 
  }

  getOrders() {
    return {
      orders: []
    }
  }
}

class Client extends ConcreteUser {
  constructor(name: string, email: string, password: string) {
    super(name, email, password, Role.Client);
  }

  getMenu() {
    return {
      menu: []
    }
  }
}

class Driver extends ConcreteUser {
  constructor(name: string, email: string, password: string) {
    super(name, email, password, Role.Driver);
  }

  setLocation() {
    // save coords
  }
}

class Owner extends ConcreteUser {
  constructor(name: string, email: string, password: string) {
    super(name, email, password, Role.Owner);
  }

  getTotalSales() {
    return {
      totalSales: 0
    }
  }
}

class UserFactory {
  static createUser(name: string, email: string, password: string, role: Role): User {
    switch (role) {
      case Role.Client:
        return new Client(name, email, password);
      case Role.Driver:
        return new Driver(name, email, password);
      case Role.Owner:
        return new Owner(name, email, password);
    }
  }
}

const newClient = UserFactory.createUser('John', 'john@mail.com', '123456', Role.Client);
```