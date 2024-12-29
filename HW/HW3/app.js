import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js';

// 以 user 作為鍵，為每個用戶儲存貼文列表
const posts = {
  ccc: [{ id: 0, title: 'ccc1', body: 'ccc1 body', created_at: new Date() }],
  snoopy: []
};

const router = new Router();

router
  .get('/', userList) // 根據不同用戶顯示貼文列表
  .get('/:user/', list) // 顯示用戶的貼文列表
  .get('/:user/post/new', add) // 顯示新增貼文的表單
  .get('/:user/post/:id', show) // 顯示特定 id 的貼文
  .post('/:user/post', create); // 提交新貼文

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function userList(ctx) {
  try {
    const users = Object.keys(posts);
    ctx.response.body = await render.userList(users);
  } catch (error) {
    console.error("Error in userList:", error);
    ctx.response.body = "An error occurred.";
  }
}

async function list(ctx) {
  try {
    const user = ctx.params.user;
    if (!posts[user]) posts[user] = [];
    ctx.response.body = await render.list(user, posts[user]);
  } catch (error) {
    console.error("Error in list:", error);
    ctx.response.body = "An error occurred.";
  }
}

async function add(ctx) {
  try {
    const user = ctx.params.user;
    ctx.response.body = await render.newPost(user);
  } catch (error) {
    console.error("Error in add:", error);
    ctx.response.body = "An error occurred.";
  }
}

async function show(ctx) {
  try {
    const user = ctx.params.user;
    const id = parseInt(ctx.params.id);
    const userPosts = posts[user] || [];
    const post = userPosts[id];
    if (!post) ctx.throw(404, 'Invalid post id');
    ctx.response.body = await render.show(user, post);
  } catch (error) {
    console.error("Error in show:", error);
    ctx.response.body = "An error occurred.";
  }
}

async function create(ctx) {
  try {
    const user = ctx.params.user;
    const body = ctx.request.body();
    if (body.type === "form") {
      const formData = await body.value;
      const post = {};
      for (const [key, value] of formData.entries()) {
        post[key] = value;
      }
      post.created_at = new Date();
      if (!posts[user]) posts[user] = [];
      post.id = posts[user].length;
      posts[user].push(post);
      ctx.response.redirect(`/${user}/`);
    } else {
      ctx.throw(400, "Invalid request body");
    }
  } catch (error) {
    console.error("Error in create:", error);
    ctx.response.body = "An error occurred.";
  }
}

console.log('Server run at http://127.0.0.1:8000');
await app.listen({ port: 8000 });
