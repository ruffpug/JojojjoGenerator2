import React, { ForwardedRef, useCallback, useImperativeHandle, useRef } from 'react'

//  じょじょっじょCanvasのProps
type JojojjoCanvasProps = {
  width: number
  height: number
  image: HTMLImageElement | null
  text: string
  maxWidth: number
}

/**
 * じょじょっじょCanvasのハンドラ
 */
export type JojojjoCanvasHandler = {
  toDataUrl(): string | null
}

//  じょじょっじょCanvas
const JojojjoCanvas = (props: JojojjoCanvasProps, ref: ForwardedRef<JojojjoCanvasHandler>) => {
  const { width, height, image, text, maxWidth } = props
  const canvasRef = useRef<HTMLCanvasElement | null>()

  //  Canvasの参照を利用して、描画内容のBase64文字列を生成する処理を提供する。
  useImperativeHandle(ref, () => ({
    toDataUrl: () => {
      const canvas = canvasRef?.current
      return canvas ? canvas.toDataURL('image/png') : null
    },
  }))

  //  Canvasの参照を購読し、テキストが変更されたタイミングで再描画を行う。
  //  参考: https://zenn.dev/service_503/articles/b7668a820b5856
  const setCanvasRef = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      canvasRef.current = canvas

      const context = canvas?.getContext('2d')
      if (context && image) {
        context.clearRect(0, 0, width, height)
        context.drawImage(image, 0, 0)

        //  テキストを1行ずつ描画していく。
        const lineHeight = 96
        const lines = text.split('\n')
        context.fillStyle = '#000000'
        context.font = '48px sans-serif'
        for (let index = 0; index < lines.length; index++) {
          const line = lines[index]
          const offsetY = lineHeight * index
          context.fillText(line, 640, 200 + offsetY)
        }
      }
    },
    [width, height, image, text],
  )

  return (
    <canvas
      ref={setCanvasRef}
      width={`${width}px`}
      height={`${height}px`}
      style={{ width: '100%', height: 'auto', maxWidth: `${maxWidth}px`, aspectRatio: width / height }}
    />
  )
}

/**
 * じょじょっじょCanvas
 */
export default React.forwardRef<JojojjoCanvasHandler, JojojjoCanvasProps>(JojojjoCanvas)
