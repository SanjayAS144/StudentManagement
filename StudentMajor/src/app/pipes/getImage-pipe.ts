import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../modal/student';
import { Teacher } from '../modal/teacher';

@Pipe({
  name: 'getImage',
})
export class GetImagePipe implements PipeTransform {
  constructor() {}

    transform(userDetails:Student|Teacher|null): string {
        if(userDetails == null)
            return "https://mdbootstrap.com/img/new/avatars/8.jpg"
        return userDetails.image == ""?"https://mdbootstrap.com/img/new/avatars/8.jpg":userDetails.image
    }
}