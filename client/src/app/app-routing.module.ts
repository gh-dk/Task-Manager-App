import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import router from '../routers/router';

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
