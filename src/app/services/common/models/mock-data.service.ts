import { Injectable } from '@angular/core';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { List_Basket_Item } from 'src/app/contracts/List_Basket_Item';
import { TokenResponse } from 'src/app/contracts/tokenResponse';
import { Token } from 'src/app/contracts/token';

@Injectable({
    providedIn: 'root',
})
export class MockDataService {
    constructor() { }

    getMockProducts(): List_Product[] {
        const mockImages: List_Product_Image[] = [
            {
                id: '1',
                fileName: 'product1.jpg',
                path: 'assets/pngwing.com.png',
                showcase: true,
            },
        ];

        return [
            {
                id: '1',
                name: 'Premium Laptop Bilgisayar',
                stock: 15,
                price: 12999.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '2',
                name: 'Akıllı Telefon Pro Max',
                stock: 25,
                price: 18999.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '3',
                name: 'Kablosuz Kulaklık',
                stock: 50,
                price: 899.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '4',
                name: 'Gaming Mouse',
                stock: 30,
                price: 599.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '5',
                name: 'Mekanik Klavye',
                stock: 20,
                price: 1299.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '6',
                name: '4K Monitör 27"',
                stock: 12,
                price: 5499.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '7',
                name: 'Tablet 10.1"',
                stock: 18,
                price: 3999.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '8',
                name: 'Akıllı Saat',
                stock: 35,
                price: 2499.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '9',
                name: 'Bluetooth Hoparlör',
                stock: 40,
                price: 1299.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '10',
                name: 'Webcam HD 1080p',
                stock: 22,
                price: 799.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '11',
                name: 'SSD 1TB',
                stock: 28,
                price: 1999.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '12',
                name: 'RAM 16GB DDR4',
                stock: 45,
                price: 1499.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '13',
                name: 'Gaming Koltuk',
                stock: 8,
                price: 6999.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '14',
                name: 'Mikrofon USB',
                stock: 15,
                price: 999.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
            {
                id: '15',
                name: 'Grafik Kartı RTX 4070',
                stock: 5,
                price: 24999.99,
                createdDate: new Date(),
                updatedDate: new Date(),
                path: 'assets/pngwing.com.png',
                productImageFile: mockImages,
            },
        ];
    }

    getMockBestSellers(): any[] {
        return [
            {
                id: '1',
                name: 'Premium Laptop Bilgisayar',
                stock: 15,
                sales: 150,
                path: 'assets/pngwing.com.png',
            },
            {
                id: '2',
                name: 'Akıllı Telefon Pro Max',
                stock: 25,
                sales: 200,
                path: 'assets/pngwing.com.png',
            },
            {
                id: '3',
                name: 'Kablosuz Kulaklık',
                stock: 50,
                sales: 300,
                path: 'assets/pngwing.com.png',
            },
            {
                id: '4',
                name: 'Gaming Mouse',
                stock: 30,
                sales: 180,
                path: 'assets/pngwing.com.png',
            },
            {
                id: '5',
                name: 'Mekanik Klavye',
                stock: 20,
                sales: 120,
                path: 'assets/pngwing.com.png',
            },
            {
                id: '6',
                name: '4K Monitör 27"',
                stock: 12,
                sales: 80,
                path: 'assets/pngwing.com.png',
            },
        ];
    }

    getMockProductById(id: string): any {
        const mockImages: List_Product_Image[] = [
            {
                id: '1',
                fileName: 'product1.jpg',
                path: 'assets/pngwing.com.png',
                showcase: true,
            },
            {
                id: '2',
                fileName: 'product2.jpg',
                path: 'assets/pngwing.com.png',
                showcase: false,
            },
            {
                id: '3',
                fileName: 'product3.jpg',
                path: 'assets/pngwing.com.png',
                showcase: false,
            },
        ];

        const products = this.getMockProducts();
        const product = products.find((p) => p.id === id);

        if (product) {
            return {
                ...product,
                productImageFile: mockImages,
                description: `${product.name} - Yüksek kaliteli ürün. Modern tasarım ve gelişmiş özelliklerle donatılmıştır.`,
            };
        }

        // Default product if not found
        return {
            id: id,
            name: 'Ürün Bulunamadı',
            stock: 0,
            price: 0,
            createdDate: new Date(),
            updatedDate: new Date(),
            path: 'assets/default.webp',
            productImageFile: mockImages,
            description: 'Ürün bulunamadı.',
        };
    }

    // Mock Basket Data
    getMockBasketItems(): List_Basket_Item[] {
        return [
            {
                basketItemId: 'basket-1',
                name: 'Premium Laptop Bilgisayar',
                price: 12999.99,
                quantity: 1,
            },
            {
                basketItemId: 'basket-2',
                name: 'Kablosuz Kulaklık',
                price: 899.99,
                quantity: 2,
            },
            {
                basketItemId: 'basket-3',
                name: 'Gaming Mouse',
                price: 599.99,
                quantity: 1,
            },
        ];
    }

    // Mock Login Data
    getMockTokenResponse(isAdmin: boolean = false): TokenResponse {
        // Generate a simple mock JWT token (not a real JWT, just for demo)
        const mockAccessToken = this.generateMockToken(isAdmin);
        const mockRefreshToken = this.generateMockToken(isAdmin, true);

        // Set expiration to 24 hours from now
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 24);

        const token: Token = {
            accessToken: mockAccessToken,
            refreshToken: mockRefreshToken,
            expiration: expiration,
        };

        return {
            token: token,
            isAdmin: isAdmin,
        };
    }

    private generateMockToken(isAdmin: boolean, isRefresh: boolean = false): string {
        // Generate a JWT-like token format (base64 encoded parts)
        // Format: header.payload.signature (3 parts separated by dots)
        const timestamp = Date.now();
        const adminStatus = isAdmin ? 'admin' : 'user';
        const tokenType = isRefresh ? 'refresh' : 'access';

        // Create payload object
        const payload = {
            userId: 'user123',
            adminStatus: adminStatus,
            tokenType: tokenType,
            timestamp: timestamp,
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours from now
        };

        // Encode to base64 (simplified - not real JWT encoding)
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payloadEncoded = btoa(JSON.stringify(payload));
        const signature = btoa(`mock_signature_${tokenType}_${adminStatus}_${timestamp}`);

        // Return JWT-like format: header.payload.signature
        return `mock_${header}.${payloadEncoded}.${signature}`;
    }

    // Mock users for login
    getMockUsers(): { username: string; email: string; password: string; isAdmin: boolean }[] {
        return [
            {
                username: 'admin',
                email: 'admin@example.com',
                password: 'admin123',
                isAdmin: true,
            },
            {
                username: 'user',
                email: 'user@example.com',
                password: 'user123',
                isAdmin: false,
            },
            {
                username: 'test',
                email: 'test@example.com',
                password: 'test123',
                isAdmin: false,
            },
        ];
    }

    // Check if login credentials match mock users
    validateMockLogin(userNameOrEmail: string, password: string): TokenResponse | null {
        const users = this.getMockUsers();
        const user = users.find(
            (u) =>
                (u.username === userNameOrEmail || u.email === userNameOrEmail) &&
                u.password === password
        );

        if (user) {
            return this.getMockTokenResponse(user.isAdmin);
        }

        return null;
    }
}

