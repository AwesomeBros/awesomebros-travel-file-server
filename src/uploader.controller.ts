import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageDto } from './dto/image.dto';
import { UploaderService } from './uploader.service';

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('image')
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    return await this.uploaderService.uploadImage(image);
  }

  @Post(':serviceName/create')
  async createImg(@Param('serviceName') serviceName: string, @Body() dto: ImageDto) {
    return this.uploaderService.createImg(serviceName, dto);
  }

  @Put(':serviceName/update')
  async updateImg(@Param('serviceName') serviceName: string, @Body() dto: ImageDto) {
    return this.uploaderService.updateImg(serviceName, dto);
  }

  @Delete(':serviceName/delete')
  async deleteImg(@Param('serviceName') serviceName: string, @Body() dto: ImageDto) {
    return this.uploaderService.deleteImg(serviceName, dto);
  }
}
