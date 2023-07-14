import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  useDisclosure,
  Heading,
  Flex,
  Spacer,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Link,
} from '@chakra-ui/react'

//  アプリヘッダ
const AppHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <header style={{ backgroundColor: '#212529' }}>
      {/* ヘッダUI部分 */}
      <Heading padding="16px 24px" fontSize="20px" color="white">
        <Flex>
          <Text alignSelf="center">じょじょっじょジェネレータ2</Text>
          <Spacer />
          <IconButton
            variant="link"
            size="lg"
            color="white"
            aria-label="license"
            icon={<InfoOutlineIcon />}
            onClick={onOpen}
          />
        </Flex>
      </Heading>

      {/* ダイアログ部分 */}
      <Modal scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>このあぷりについて</ModalHeader>
          <DialogBody />
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </header>
  )
}

//  ダイアログボディ部分
const DialogBody = () => {
  return (
    <ModalBody>
      <p>じょじょっじょにしゃべってもらうにぇ。😋</p>
      <br />
      <p>🌟くれじっと</p>
      <p>・しゅつえん: うちのかいぬしさん👧</p>
      <p>・ぷろぐらむ: わたし🐶</p>
      <p>・いらすと: わたし🐶</p>
      <br />
      <p>🌟らいぶらり</p>
      <br />
      <p>
        <Link href="./libraries.txt">ここ</Link> にまとめているにぇ。😋
      </p>
      <p>ありがたすぎるんだよねぇ。😋</p>
    </ModalBody>
  )
}

/**
 * アプリヘッダ
 */
export default AppHeader
