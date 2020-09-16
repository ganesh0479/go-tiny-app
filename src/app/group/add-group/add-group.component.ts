import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {GroupService} from '../../services/group.service';
import {Group} from '../../model/group';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  closeBtnName: string;
  submitBtnName: string;
  group;

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private groupService: GroupService, private router: Router) {
    this.group = this.formBuilder.group({name: ''});
  }

  ngOnInit(): void {
  }

  addGroup(groupToAdd: Group): void {
    groupToAdd.createdBy = sessionStorage.getItem('user');
    this.groupService.add(groupToAdd).subscribe({
      next: data => this.navigateToGroup(),
      error: error => console.error('There was an error!', error)
    });
  }

  private navigateToGroup(): void {
    this.bsModalRef.hide();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/home/group']);
    });
  }
}
