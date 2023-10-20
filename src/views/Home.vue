<template>
    <div style="margin-bottom: 90px;">
        <!-- 轮播图 -->
        <el-carousel :interval="3000" type="card" height="200px" style="margin-top: 35px;">
            <el-carousel-item v-for="item in imgItems" :key="item" style="border-radius: 15px;">
                <img :src="item" />
            </el-carousel-item>
        </el-carousel>

        <!-- 推荐歌单 -->
        <div class="recommend" >
            <h3>推荐歌单</h3>
            <ul>
                <li v-for="(item, index) in musicList" :key="item.id" @click="changetoDetail(item.id)">
                    <div class="img-container" style="width: 150px;" @mouseenter="showPlay(index)"
                        @mouseleave="closeShowPlay(index)">
                        <img :src="item.picUrl" />
                        <div class="right-icon" style="display: none;" :ref="(el)=>getIconDom(el,index)">
                            <div class="trangile"></div>
                        </div>
                    </div>
                    <div class="text">{{ item.name }}</div>
                </li>
            </ul>
        </div>

        <!-- 热门播客 -->
        <div class="hot-play">
            <h3>热门播客&nbsp;></h3>
            <ul>
                <li>
                    <div class="playIcon">
                        <img src="../img/recommend.png" alt="">
                        <div class="right-icon">
                            <div class="trangile"></div>
                        </div>
                    </div>
                    <div class="content">
                        <div class="title">抖音2023热歌（Remic）</div>
                        <div>
                            <span class="rank">欧美音乐榜</span>
                        </div>
                        <div class="time">
                            <span>一人一首成名曲</span>
                            <span>
                                <i class="iconfont icon-bofang"></i>573万</span>
                            <span><el-icon>
                                    <Money />
                                </el-icon>04:56</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <img src="../img/recommend.png" alt="">
                    </div>
                    <div class="content">
                        <div class="title">抖音2023热歌（Remic）</div>
                        <div>
                            <span class="rank">欧美音乐榜</span>
                        </div>
                        <div class="time">
                            <span>一人一首成名曲</span>
                            <span>
                                <i class="iconfont icon-bofang"></i>573万</span>
                            <span><el-icon>
                                    <Money />
                                </el-icon>04:56</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <img src="../img/recommend.png" alt="">
                    </div>
                    <div class="content">
                        <div class="title">抖音2023热歌（Remic）</div>
                        <div>
                            <span class="rank">欧美音乐榜</span>
                        </div>
                        <div class="time">
                            <span>一人一首成名曲</span>
                            <span>
                                <i class="iconfont icon-bofang"></i>573万</span>
                            <span><el-icon>
                                    <Money />
                                </el-icon>04:56</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <img src="../img/recommend.png" alt="">
                    </div>
                    <div class="content">
                        <div class="title">抖音2023热歌（Remic）</div>
                        <div>
                            <span class="rank">欧美音乐榜</span>
                        </div>
                        <div class="time">
                            <span>一人一首成名曲</span>
                            <span>
                                <i class="iconfont icon-bofang"></i>573万</span>
                            <span><el-icon>
                                    <Money />
                                </el-icon>04:56</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 最新音乐 -->
        <div class="new-music">
            <h3>最新音乐&nbsp;></h3>
            <ul>
                <li v-for="item in newMusicList" :key="item.id">
                    <div>
                        <img :src="item.picUrl" alt="">
                    </div>
                    <div class="content">
                        <div class="title">{{ item.name }}</div>
                        <div>
                            <span class="hi">Hi-Res</span>
                            <span class="mv">MV</span>
                            <span class="singger" v-for="(p, index) in item.song.artists" :key="p.id">
                                <span style="margin-right: 2px;">{{ p.name }}</span>
                                <span v-if="index < item.song.artists.length - 1" style="margin-right: 2px;">|</span>

                            </span>
                        </div>
                    </div>
                </li>
            </ul>

        </div>

    </div>
</template>

<script setup>
import { onMounted, ref, } from "vue";
import { getMusic, getNewMusic, getHotMusic } from "../api/home";
import router from "../router";

const imgItems = ref([
    'src/img/carouselImg/one.png',
    'src/img/carouselImg/two.png',
    'src/img/carouselImg/three.png',
    'src/img/carouselImg/four.png'
])

const musicList = ref([])//推荐歌单
const hotList = ref([])//热门博客
const newMusicList = ref([])//最新音乐
// const inImgIndex=ref(null)//鼠标所在图片上的下标
const iconRefs = ref([]);//获取图标的dom操作

const getIconDom = (el,index) => {
    //el-拿到的是dom元素
    //index拿到的是该dom元素的下标
    // console.log('el',el);
    // console.log('index',index);
    iconRefs.value[index]=el
//   iconRefs.value.push(el);
};

//鼠标进入 展示播放图标
const showPlay = (index) => {
    iconRefs.value[index].style.display = 'flex';
    // v-if="inImgIndex === index"
    // inImgIndex.value=index
}
//鼠标离开 隐藏播放图标
const closeShowPlay = (index) => {
    iconRefs.value[index].style.display = 'none';
    // inImgIndex.value=null
}

//获取推荐歌单列表
const getMusicList = async () => {
    const res = await getMusic({ limit: 10 })
    musicList.value = res.data.result
}
//点击歌单跳转到歌单详情列表
const changetoDetail = (id) => {
    //获取推荐歌单详情
    router.push(`/recommendDetail?id=${id}`)
}

//获取热门播客
const getHotPlay = async () => {
    const res = await getHotMusic({ limit: 10 })
    console.log('热门播客', res);
    hotList.value = res.data.result
}
//获取最新音乐
const getNewList = async () => {
    const res = await getNewMusic()
    newMusicList.value = res.data.result
}

onMounted(() => {
    getMusicList()
    getHotPlay()
    getNewList()
});

</script>

<style scoped lang="scss">
.recommend {
    ul {
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        li {
            list-style: none;
            // margin-right: 50px;
            margin-top: 20px;
            width: 18%;

            // position: relative;
            .img-container {
                position: relative;

                .right-icon {
                    position: absolute;
                    left: 108px;
                    bottom: 20px;
                    width: 30px;
                    height: 30px;
                    z-index: 8888;
                    border-radius: 50%;
                    background-color: #dddddd;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .trangile {
                        width: 0;
                        height: 0;
                        border-top: 7px solid transparent;
                        border-left: 10px solid red;
                        border-right: 0px solid transparent;
                        border-bottom: 7px solid transparent;
                    }

                    // }
                }
            }



            img {
                width: 150px;
                height: 150px;
                border-radius: 15px;
            }

            .text {
                margin-top: 5px;
                width: 150px;
                font-size: 14px;
                line-height: 20px;
            }
        }
    }
}

.hot-play {
    margin-top: 30px;

    ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        justify-content: space-between;

        li {
            width: 48%;
            list-style: none;
            display: flex;
            align-items: center;
            margin-top: 10px;

            .playIcon {
                position: relative;

                .right-icon {
                    position: absolute;
                    left: 62px;
                    bottom: 15px;
                    width: 30px;
                    height: 30px;
                    z-index: 8888;
                    border-radius: 50%;
                    background-color: #dddddd;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .trangile {
                        width: 0;
                        height: 0;
                        border-top: 7px solid transparent;
                        border-left: 10px solid red;
                        border-right: 0px solid transparent;
                        border-bottom: 7px solid transparent;
                    }

                    // }
                }

            }

            img {
                width: 100px;
                height: 100px;
                border-radius: 15px;
            }

            .content {
                margin-left: 15px;

                .title {
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }

                .rank {
                    border: 1px solid gray;
                    padding: 1px;
                    font-size: 12px;
                    color: gray;
                }

                .time {
                    font-size: 12px;
                    margin-top: 5px;

                    span {
                        margin-right: 20px;

                    }

                    i {
                        margin-right: 5px;
                        font-size: 12px;
                    }

                    .el-icon {
                        margin-right: 5px;
                        font-size: 12px;
                    }
                }

            }

        }
    }
}

.new-music {
    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0%;

        li {
            list-style: none;
            width: 31%;
            margin-top: 15px;
            display: flex;
            align-items: center;

            img {
                width: 70px;
                height: 70px;
                margin-right: 15px;
                border-radius: 15px;
            }

            .content {
                .title {
                    font-weight: bold;
                    font-size: 16px;
                    margin-bottom: 5px;
                }

                .hi,
                .mv {
                    border: 1px solid red;
                    color: red;
                    // padding: 1px;
                    margin-right: 10px;
                    font-size: 11px;
                }

                .singger {
                    font-size: 11px;
                }
            }

        }
    }
}
</style>