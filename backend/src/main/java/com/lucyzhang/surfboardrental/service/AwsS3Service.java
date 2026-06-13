
package com.lucyzhang.surfboardrental.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AwsS3Service {

    // 这是一个“假的”S3服务
    // 只要前端发来图片，就假装存好，返回一个固定的网上图片链接
    public String saveImageToS3(MultipartFile photo) {
        //冲浪板图片链接
        return "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3";
    }

    // 假装删除
    public void deleteImageFromS3(String imageUrl) {
        // 什么都不做，控制台打印一下
        System.out.println("Mocking delete image: " + imageUrl);
    }
}