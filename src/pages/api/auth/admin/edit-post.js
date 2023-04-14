import prisma from "../../../../../lib/prisma";
import { authenticatedAdmin, allowPost } from "../middlewares";

export default allowPost(
  authenticatedAdmin(async function handler(req, res, decodedId) {
    // [2] Auflösung des Bodys
    // //////////////////////////////////////////////////////////////

    const data = req.body;
    const { postId, edit } = data;

    console.log(edit + "und" + postId);

    const updatePost = await prisma.post.update({
      where: { id: postId },

      data: {
        disabled: edit ? false : true,
      },
    });

    res.status(200).json({ message: "Post wurde aktiviert/deaktiviert" });
    return;
  })
);

// Erklärung zu: API resolved without sending a response for /api/auth/admin/disable-post, this may result in stalled requests.
// https://stackoverflow.com/questions/62012994/next-js-api-api-resolved-without-sending-a-response-for-api-employees-this-m
export const config = {
  api: {
    externalResolver: true,
  },
};
