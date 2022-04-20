import { Pipe, PipeTransform } from '@angular/core'
import { AppwriteService } from '@core/appwrite/appwrite.service'

@Pipe({
    name: 'profilePhoto',
})
export class ProfilePhotoPipe implements PipeTransform {
    constructor(private appwrite: AppwriteService) {}

    async transform(name = ''): Promise<string> {
        return this.appwrite.sdk?.avatars.getInitials(name, 50, 50)?.href ?? ''
    }
}
