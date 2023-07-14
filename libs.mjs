import * as fs from 'fs'
import { init } from 'license-checker'

//  プロダクトコードの使用ライブラリを列挙してファイル出力する。
init(
  { start: './', production: true, excludePrivatePackages: true },
  (err, packages) => {
    if (err) {
      console.error(err)
    } else {
      //  各パッケージに関してライセンス表記をファイルに追記していく。
      const outputFile = './public/libraries.txt'
      for (let key in packages) {
        const pkg = packages[key]

        //  ライセンスファイルが見つかった場合
        if (pkg.licenseFile) {
          //  ライセンス本文付きで追記する。
          const licenseBody = fs.readFileSync(pkg.licenseFile, 'utf-8')
          fs.appendFileSync(outputFile, `${key}\n\n${licenseBody}\n\n\n`)
        }

        //  ライセンスファイルが見つからなかった場合
        else {
          console.warn(
            `ライセンスファイル不明: ライブラリ名=${key}, ライセンス種類=${pkg.licenses}, URL=${pkg.repository}`,
          )

          //  手動でライセンス本文を追記させる旨を明示する。
          fs.appendFileSync(
            outputFile,
            `${key}\n\nTODO: ここにライセンス本文を追記\n\n\n`,
          )
        }
      }
    }
  },
)
