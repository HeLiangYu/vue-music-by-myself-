// 封装一个类，传入id和name，计算得到一个avator
export default class Singer {
    constructor(id, name, mid) {
        this.id = id;
        this.name = name;
        this.avator = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`
    }
}