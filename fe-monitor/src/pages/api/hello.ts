import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  [props: string]: string
}

export default function hello(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { query, body } = req;
  console.log('上传数据 - ', body, query);
  res.status(200).json({ message: 'Hello from Next.js!' });
  res.status(200).json({});
}
