import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { FinalizarCompraComponent } from './finalizarCompra/finalizar-compra/finalizar-compra.component';
import { ArtigosComponent } from './artigos/artigos/artigos.component';
import { UserPageComponent } from './userPage/user-page/user-page.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'produtos', component: ProdutosComponent},
  { path: 'finalizar-compra', component: FinalizarCompraComponent},
  { path: 'artigos', component: ArtigosComponent},
  { path: 'userPage', component: UserPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
