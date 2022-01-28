export class Encrypt {
  async encryptData(buffer: any, key: any) {
    return new Promise(resolve => {
      const dataBytes = this.createByteArray(buffer);
      const keyBytes = this.createByteArray(key);
      const res: any = [];
      dataBytes.map((x: any, index: any) => {
        // tslint:disable-next-line:no-bitwise
        res.push(x ^ keyBytes[index]);
      });
      resolve(res);
    });
  }
  createByteArray(data: any) {
    const str = data;
    let bytes: any = []; // char codes
    let bytesv2: any = []; // char codes
    for (let i = 0; i < str.length; ++i) {
      const code = str.charCodeAt(i);
      bytes = bytes.concat([code]);
      // tslint:disable-next-line:no-bitwise
      bytesv2 = bytesv2.concat([code & 0xff, code / 256 >>> 0]);
    }
    return bytes;
  }
  generateCardKey(expMonth: any, expYear: any, cardNumber: any) {
    const encryptedKey = expMonth + expYear;
    let key = '';
    for (let index = 0; index < cardNumber.length; index++) {
      key += encryptedKey;
      if (key.length > cardNumber.length) {
        key = key.slice(0, cardNumber.length - key.length);
      }
    }
    return key;
  }
  generateKeyForRoutingNumber(userId: any) {
    return userId.substring(0, 9);
  }
  generateCVVKey(card: any) {
    // first three numbers of card
    return card.substring(0, 4);
  }
  generateKeyForAccountNumber(userId: any, length: any) {
    return userId.substring(0, length);
  }
}
