import { Request, Response } from "express";
import { nanoid } from "nanoid";
import geoip from "geoip-lite";
import Url from "../models/url.model";

// Create Short URL
export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { originalUrl, expirationDate } = req.body;

    const shortUrl = nanoid(8); // Generate an 8-character ID
    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
      expirationDate: expirationDate ? new Date(expirationDate) : null,
    });

    res.status(201).json({ message: "Short URL created", shortUrl });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Redirect to Original URL
export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });

    if (!url || (url.expirationDate && new Date() > url.expirationDate)) {
      return res.status(404).json({ error: "URL not found or expired" });
    }

    // Track click data
    const ip = req.ip;
    // const geo = geoip.lookup(ip);
    await Url.updateOne(
      { shortUrl },
      // { $inc: { clicks: 1 }, $push: { clickData: { ip, country: geo?.country } } }
      { $inc: { clicks: 1 }, $push: { clickData: { ip} } }

    );

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Analytics
export const getUrlAnalytics = async (req: Request, res: Response) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });

    if (!url) return res.status(404).json({ error: "URL not found" });

    res.status(200).json({
      totalClicks: url.clicks,
      clickData: url.clickData,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

