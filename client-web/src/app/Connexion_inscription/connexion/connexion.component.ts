import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {PianoTracker} from '@sncf/ngx-piano';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  constructor(private router: Router,
              private authService: AuthService,
              private pianoTracker: PianoTracker) { }

  login!: string;
  password!: string;

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('');
    }
  }

  onSubmit() {
    this.authService.login(this.login, this.password).subscribe({
      next: (res: {token: string}) => {
        this.authService.loginSuccessful(res);
        this.pianoTracker.sendEvent("Login successfull", {
          value: this.login + "is logged"
        })
        this.router.navigateByUrl('');
      }
    })
  }

  goAjoutProfil(){
    this.router.navigateByUrl('ajoutProfil')
  }

  allFieldsEntered(): boolean {
    return !this.password && !this.login;
  }

}
