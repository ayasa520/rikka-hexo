---
title: Python 实现窗口保持置顶
tag: 'Python'
categories: 无用小工具
highlight_shrink: false
date: 2021-06-24
---

{% note info modern %}今天一边看视频一边用 Typora 记笔记的时候发现一个问题, Typora 自带的 `保持窗口在最前端`不知何故会失效, 所以我就想用 Python 写一个可以让窗口强制指定的工具, 毕竟在查阅文档的时候还是有些用处的.{% endnote %}

## 使用的模块

1. win32gui 
1. keyboard 
1. win32con 
1. pyinstaller 

## 使用的函数及其原型

1. `SetWindowPos` 

   ```cpp
   WINUSERAPI BOOL WINAPI SetWindowPos(HWND hWnd,HWND hWndInsertAfter,int X,int Y,int cx, int cy, UINT uFlags);
   ```

   用于设置窗口的 Z 序号

   参数解释如下:

   + `hwnd`: 被修改的窗口的句柄
   + `hWndlnsertAfter`: 用于标识 Z 顺序, 可设为以下值:
     + `HWND_BOTTOM`: 值为 1, 置底
     + `HWND_NOTOPMOST`: 值为 -2, 置于非置顶窗口之上
     + `HWND_TOP` : 值为 0, 置顶
     + `HWND_TOPMOST`: 值为 -1, 置顶 (在`HWND_TOP`之上)
   + `X`, `Y`, `cx`,`cy` 确定了新窗口的位置和宽高
   + `uFlags`: 窗口尺寸和定位的标识, 部分值如下:
     + `SWP_NOOWNERZORDER`: 不改变 Z 序中所有者窗口的位置
     + `SWP_NOSIZE`: 不改变窗口大小
     + `SWP_NOMOVE`: 不移动窗口

1. `GetForegroundWindow` 

   用于获取当前激活的窗口 (鼠标焦点所在窗口)的句柄

   ```cpp
   HWND GetForegroundWindow(void);
   ```

3. `keyboard.addhotkey` 和` keyboard.wait`

   ```python
   keyboard.add_hotkey('alt + t', fun)
   while true:
   	keyboard.wait()
   ```

   `add_hotkey` 可以设置热键和检测到热键按下后执行的方法,  `wait`是阻塞方法, 便于检测组合键

## 源码

```python
import win32gui
import keyboard
import win32con
import atexit


class totop:
    flag = False
    hw = ''

    def force_focus(self, hwnd):
        win32gui.SetWindowPos(hwnd, win32con.HWND_TOPMOST, 0, 0, 0, 0,
                              win32con.SWP_NOOWNERZORDER | win32con.SWP_NOSIZE | win32con.SWP_NOMOVE)
        print("置顶", hwnd, win32gui.GetWindowText(hwnd))

    def cancel_focus(self, hwnd):
        win32gui.SetWindowPos(hwnd, win32con.HWND_NOTOPMOST, 0, 0, 0, 0,
                              win32con.SWP_SHOWWINDOW | win32con.SWP_NOSIZE | win32con.SWP_NOMOVE)
        print("取消置顶", hwnd, win32gui.GetWindowText(hwnd))

    def handler(self, op, hwnd):
        op(hwnd)

    def get_key(self):
        def fun():

            if not self.flag and win32gui.GetForegroundWindow() != '':
                self.hd = win32gui.GetForegroundWindow()
                self.handler(self.force_focus, self.hd)
                self.flag = True
            elif self.flag and win32gui.GetForegroundWindow() != '':
                if self.hd == win32gui.GetForegroundWindow():
                    self.handler(self.cancel_focus, win32gui.GetForegroundWindow())
                    self.flag = False

        keyboard.add_hotkey('alt+t', fun)

        while True:
            keyboard.wait()


if __name__ == '__main__':
    zd = totop()
    zd.get_key()

```







