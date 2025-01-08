import bcrypt from 'bcrypt';

export class EncryptionService {
    public static hash(pin: string): string {
        return bcrypt.hashSync(pin, 10);
    }

    public static verify(pin: string, hash: string): boolean {
        return bcrypt.compareSync(pin, hash);
    }
}
