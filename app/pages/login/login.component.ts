import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from "@angular/core";
import {
  User
} from '../../shared/user/user';
import {
  UserService
} from '../../shared/user/user.service';
import {
  Router
} from "@angular/router-deprecated";
import {
  Page
} from "ui/page";
import {
  Color
} from "color";
import {
  View
} from "ui/core/view";


@Component({
  selector: "my-app",
  templateUrl:'pages/login/login.html',
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
  providers:[UserService]
})
export class LoginComponent implements OnInit{
  email = 'eeandrew@lu.com';
  isLogin = true;
  @ViewChild("container") container: ElementRef;
  user: User;
  constructor(private page:Page,private _router: Router,private _userService: UserService) {
    this.user = new User('zhoulin@sina.com','123456');
  }

  submit() {
    if(this.isLogin) {
      this.login();
    }else {
      this.signUp();
    }
  }

  login() {
    const {
      email,
      password,
    } = this.user;
    if(!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }
    this._userService.login(this.user)
    .subscribe(
      () => this._router.navigate(["List"]),
      (error) => alert("Unfortunately we could not find your account.")
    );
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = this.page.ios ? "res://bg_login.jpg" : "res://bg_login";
  }

  signUp() {
    this._userService.register(this.user).subscribe(()=>{
      alert("Your account was successfully created.");
      this.toggleDisplay();
    },()=>{
      alert("Unfortunately we were unable to create your account.")
    });
  }
  
  toggleDisplay() {
    this.isLogin = !this.isLogin;
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLogin ? new Color('white') : new Color('#BEBEBE'),
      duration:200
    });
  }

  toWindchime() {
    this._router.navigate(["Windchime"])
  }
}