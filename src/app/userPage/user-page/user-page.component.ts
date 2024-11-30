import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/item-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit{
  isLoggedIn: boolean = false;
  username: string = '';
  userPurchases: any[] = [];
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isRegistering: boolean = false;

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser, 'stored user')
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.isLoggedIn = true;
      this.username = userData.name;
      this.productService.getPurchasesByCpf(userData.cpf).subscribe((purchases) => {
        this.userPurchases = purchases;
      })
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      password: ['', Validators.required],
    });
  }

  toggleRegistering(): void {
    this.isRegistering = !this.isRegistering;
  }
  getTotalPrice(cartItems: any[]): number {
    return cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  }
  
  onLogin(): void {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
  
      const user = users.find((u: any) => u.email === email && u.password === password);
  
      if (user) {
        localStorage.setItem('user', JSON.stringify({
          name: user.name,
          email: user.email,
          cpf: user.cpf, 
          purchases: user.purchases || []
        }));
  
        this.isLoggedIn = true;
        this.username = user.name;
        this.productService.getPurchasesByCpf(user.cpf).subscribe((purchases) => {
          this.userPurchases = purchases;
        });
  
        alert('Login realizado com sucesso!');
      } else {
        alert('Email ou senha incorretos!');
      }
    }
  }
  
  

  onRegister(): void {
    if (this.registerForm.valid) {
      const { name, email, cpf, password } = this.registerForm.value;
  
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
  
      const userExists = users.some((user: any) => user.email === email);
      if (userExists) {
        alert('Um usuário com esse email já existe!');
        return;
      }
  
      users.push({ name, email, cpf, password, purchases: [] });
      localStorage.setItem('users', JSON.stringify(users));
  
      localStorage.setItem('user', JSON.stringify({ name, email, cpf, purchases: [] }));
      this.isLoggedIn = true;
      this.username = name;
      this.productService.getPurchasesByCpf(cpf).subscribe((purchases) => {
        this.userPurchases = purchases;
      });
      alert('Sucesso.');
      this.isRegistering = false;
    }
  }
  
  

  onLogout(): void {
    localStorage.removeItem('user');
    window.location.reload();
  }

}
