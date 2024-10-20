import { omit } from "../utils/omit";
import { httpClient } from "./request";
export enum MessageType {
  TEXT = 0, // 文本
  MARKDOWN = 2, // Markdown
  ARK = 3, // Ark 消息
  EMBED = 4, // Embed
  MEDIA = 7, // 富媒体
}
type MarkdownObject =
  | {
      content: string; // Markdown 内容
    }
  | {
      content_template_id: string; //markdown 模版id，申请模版后获得
      params: Array<{
        keys: string;
        values: string;
      }>;
    };

type KeyboardObject = {
  buttons: Array<{ label: string; action: string }>; // 按钮配置
};

type MediaObject = {
  file_info: string; // 富媒体的文件信息
};

type ArkObject = {
  title: string; // Ark 消息标题
  content: string; // Ark 消息内容
};

type MessageReference = {
  // 具体结构未支持
};
type Params = {
  groupOpenId: string;
  content: string; // 文本内容
  msg_type: MessageType; // 消息类型
  markdown?: MarkdownObject; // 可选的 Markdown 对象
  keyboard?: KeyboardObject; // 可选的 Keyboard 对象
  media?: MediaObject; // 可选的 富媒体对象
  ark?: ArkObject; // 可选的 Ark 对象
  message_reference?: MessageReference; // 可选的 消息引用
  event_id?: string; // 可选的 前置事件 ID
  msg_id: string; // 前置消息 ID
  msg_seq?: number; // 可选的 回复消息序号
};
export async function replyGroupAt(params: Params) {
  const { groupOpenId } = params;
  const apiUrl = `/v2/groups/${groupOpenId}/messages`;
  console.log(params, apiUrl);
  try {
    const response = await httpClient.post(
      apiUrl,
      omit(params, ["groupOpenId"])
    );
    return response.data; // 返回响应数据
  } catch (error) {
    console.error("Error sending media file:", error);
    throw error; // 抛出错误以便处理
  }
  return undefined;
}
