import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageDto } from './dto/image.dto';
import { UploaderService } from './uploader.service';

@Controller('uploader') // API 기본 경로: /uploader
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('image')
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    return await this.uploaderService.uploadImage(image);
  }

  @Post('create')
  async createImg(@Body() dto: ImageDto) {
    return this.uploaderService.createImg(dto);
  }

  @Put('update')
  async updateImg(@Body() dto: ImageDto) {
    return this.uploaderService.upadteImg(dto);
  }

  @Delete('delete')
  async deleteImg(@Body() dto: ImageDto) {
    return this.uploaderService.deleteImg(dto);
  }
}
