// src/uploader/uploader.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ImageDto } from './dto/image.dto';
import {
  deleteImageFolder,
  handleImagePersistence,
} from './utils/image-handler';

@Injectable()
export class UploaderService {
  uploadImage(image: Express.Multer.File) {
    if (!image) {
      throw new NotFoundException('해당 이미지를 찾을 수 없습니다.');
    }
    const fileUrl = `${process.env.SERVER_URL}/uploads/temp/${image.filename}`;
    return fileUrl;
  }

  async createImg(dto: ImageDto) {
    const { id, images, entity } = dto;
    return await handleImagePersistence(id, images ? images : [], [], entity);
  }

  async upadteImg(dto: ImageDto) {
    const { id, images, entity, existingImages } = dto;
    return await handleImagePersistence(
      id,
      images ? images : [],
      existingImages ? existingImages : [],
      entity,
    );
  }

  async deleteImg(dto: ImageDto) {
    const { id, entity } = dto;
    await deleteImageFolder(id, entity);
    return { success: true };
  }
}
