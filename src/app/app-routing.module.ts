import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { FinalizarCompraComponent } from './finalizarCompra/finalizar-compra/finalizar-compra.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'produtos', component: ProdutosComponent},
  { path: 'finalizar-compra', component: FinalizarCompraComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
