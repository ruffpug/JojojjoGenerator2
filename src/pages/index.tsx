import { Box, Button, Heading, Image as ChakraImage, Spacer, Textarea } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useRef, useEffect, useState } from 'react'
import JojojjoCanvas, { JojojjoCanvasHandler } from '@/JojojjoCanvas'

//  画像横幅
const imageWidth = 1280

//  画像高さ
const imageHeight = 720

//  コンテンツの最大横幅
const contentMaxWidth = 640

//  出力画像の最大横幅
const outputImageMaxWidth = Math.floor(contentMaxWidth / 2)

//  ページ
const Index = () => {
  const params = useSearchParams()
  const value: string | null = params.get('value')
  const initialText: string = decodeURIComponent(value ?? '')
  console.log(`初期値: ${value}, ${initialText}`)

  return <Content initialText={initialText} />
}

//  コンテンツ部分のProps
type ContentProps = { initialText: string }

//  コンテンツ部分
const Content = (props: ContentProps) => {
  const { initialText } = props

  const router = useRouter()
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [text, setText] = useState('')
  const [outputSrc, setOutputSrc] = useState<string | null>(null)
  const canvasHandlerRef = useRef<JojojjoCanvasHandler>(null)

  //  初期値を設定する。
  useEffect(() => setText(initialText), [initialText])

  //  画像を読み込む。
  useEffect(() => {
    const img = new Image()
    img.src = './marisa.png'
    img.onload = () => setImage(img)
  }, [])

  //  テキストが変更されたときのコールバック
  const onTextChanged = (text: string) => {
    //  クエリパラメタを更新する。
    const updatedValueParam = encodeURIComponent(text)
    router.replace({ query: { value: updatedValueParam } }, undefined, { shallow: true })

    //  テキストを更新する。
    setText(text)
  }

  //  出力ボタンがクリックされたときのコールバック
  const onOutputButtonClicked = () => {
    const canvas = canvasHandlerRef.current
    setOutputSrc(canvas ? canvas.toDataUrl() : null)
  }

  return (
    <Box width="100%">
      <Header />
      <main>
        <Box display="flex" flexFlow="column" alignItems="center" justifyContent="center">
          <Spacer margin="16px" />

          {/* Canvas部分 */}
          <JojojjoCanvas
            ref={canvasHandlerRef}
            width={imageWidth}
            height={imageHeight}
            image={image}
            text={text}
            maxWidth={contentMaxWidth}
          />

          <Spacer margin="16px" />

          {/* テキスト入力部分 */}
          <Textarea
            width="100%"
            maxWidth={`${contentMaxWidth}px`}
            placeholder="じょじょっじょはなんて言うてる?"
            value={text}
            onChange={(e) => onTextChanged(e.target.value)}
          ></Textarea>

          <Spacer margin="16px" />

          {/* 出力ボタン */}
          <Button colorScheme="red" onClick={onOutputButtonClicked}>
            ↓ 画像出力
          </Button>

          <Spacer margin="16px" />

          {/* 出力画像 */}
          {outputSrc && <ChakraImage src={outputSrc} alt="output" width="100%" maxWidth={`${outputImageMaxWidth}px`} />}

          <Spacer margin="16px" />
        </Box>
      </main>
    </Box>
  )
}

const Header = () => {
  return (
    <header style={{ backgroundColor: '#212529' }}>
      <Heading padding="16px 24px" fontSize="20px" color="white">
        じょじょっじょジェネレータ2
      </Heading>
    </header>
  )
}

export const getStaticProps = async () => {
  return { props: {} }
}

export default Index
