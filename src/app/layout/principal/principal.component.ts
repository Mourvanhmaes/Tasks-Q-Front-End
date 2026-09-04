import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from "../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-principal',
  imports: [SidebarComponent, RouterOutlet, FooterComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
