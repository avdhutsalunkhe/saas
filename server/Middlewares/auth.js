import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const authResult = await req.auth();
    if (!authResult) return res.status(401).json({ message: "Unauthorized" });

    const { userId, has } = authResult;
    const hasPremiumPlan = await has({ plan: 'premium' });

    const user = await clerkClient.users.getUser(userId);
    const freeUsage = user?.privateMetadata?.free_usage || 0;

    if (!hasPremiumPlan) {
      req.free_usage = freeUsage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: 0 },
      });
      req.free_usage = 0;
    }

    req.plan = hasPremiumPlan ? 'premium' : 'free';
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
