import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { NavParams, ModalController } from '@ionic/angular';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { UploadProfilePicService } from 'src/app/services/upload-profile-pic.service';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  currentUser: User;

    // Upload Task 
    task: AngularFireUploadTask;
 
    // Progress in percentage
    percentage: Observable<number>;
   
    // Snapshot of uploading file
    snapshot: Observable<any>;
   
    // Uploaded File URL
    UploadedFileURL: Observable<string>;
   
    //Uploaded Image Url
    image: string;
   
    //File details  
    fileName:string;
    fileSize:number;
   
    //Status check 
    isUploading:boolean;
    isUploaded:boolean;

  constructor(
    private navParams: NavParams, 
    private modalCtrl: ModalController,
    private profilePicService: UploadProfilePicService,
    private storage: AngularFireStorage
  ) { 
    this.currentUser = this.navParams.get('currentUser');
    console.log('current user details:', this.currentUser);
  }

  ngOnInit() {}

  onUploadProfilePic(event: FileList) {
    // The File object
    const file = event.item(0)
 
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }
 
    this.isUploading = true;
    this.isUploaded = false;
 
 
    this.fileName = file.name;
 
    // The storage path
    const path = `profile-pics/${this.currentUser.id}_${file.name}`;
 
    // Totally optional metadata
    const customMetadata = { image: 'user profile pic' };
 
    //File reference
    const fileRef = this.storage.ref(path);
 
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
 
    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(imageUrl =>{
          this.image = imageUrl;
          this.profilePicService.addImageUrlToDb(this.currentUser.id, imageUrl);
          this.isUploading = false;
          this.isUploaded = true;
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
  }

  onClose() {
    this.modalCtrl.dismiss({ 'dismissed': true });
  }

}
