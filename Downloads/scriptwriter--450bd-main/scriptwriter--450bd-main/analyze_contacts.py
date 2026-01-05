import mysql.connector
import json
from datetime import datetime

# Database credentials for Bitrix24
DB_HOST = "127.0.0.1"
DB_USER = "root"
DB_PASSWORD = ""
DB_NAME = "bitrix"

def connect_to_bitrix_db():
    """Connect to Bitrix24 database"""
    try:
        connection = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME
        )
        print("Connected to Bitrix24 database successfully!")
        return connection
    except mysql.connector.Error as e:
        print(f"Error connecting to database: {e}")
        return None

def get_bitrix_deals():
    """Fetch deals from Bitrix24 database"""
    connection = connect_to_bitrix_db()
    if not connection:
        return []

    try:
        cursor = connection.cursor(dictionary=True)

        # Query to fetch deals (adjust table name based on your Bitrix24 setup)
        query = """
        SELECT
            d.ID,
            d.TITLE,
            d.STAGE_ID,
            d.OPPORTUNITY,
            d.CURRENCY_ID,
            d.CONTACT_ID,
            d.COMPANY_ID,
            d.DATE_CREATE,
            d.DATE_MODIFY,
            c.NAME as CONTACT_NAME,
            c.LAST_NAME as CONTACT_LAST_NAME,
            co.TITLE as COMPANY_NAME
        FROM b_crm_deal d
        LEFT JOIN b_crm_contact c ON d.CONTACT_ID = c.ID
        LEFT JOIN b_crm_company co ON d.COMPANY_ID = co.ID
        WHERE d.DATE_CREATE >= '2024-01-01'
        ORDER BY d.DATE_CREATE DESC
        LIMIT 1000
        """

        cursor.execute(query)
        deals = cursor.fetchall()

        print(f"Fetched {len(deals)} deals from database")

        cursor.close()
        connection.close()

        return deals

    except mysql.connector.Error as e:
        print(f"Error fetching deals: {e}")
        return []
    finally:
        if connection and connection.is_connected():
            connection.close()

def analyze_deals(deals):
    """Analyze the fetched deals"""
    if not deals:
        print("No deals to analyze")
        return

    print(f"\n=== ANALYSIS RESULTS ===")
    print(f"Total deals: {len(deals)}")

    # Stage analysis
    stages = {}
    currencies = {}
    total_value = 0

    for deal in deals:
        # Stage analysis
        stage = deal.get('STAGE_ID', 'Unknown')
        stages[stage] = stages.get(stage, 0) + 1

        # Currency analysis
        currency = deal.get('CURRENCY_ID', 'Unknown')
        currencies[currency] = currencies.get(currency, 0) + 1

        # Value analysis
        opportunity = deal.get('OPPORTUNITY', 0)
        if isinstance(opportunity, str):
            try:
                opportunity = float(opportunity)
            except:
                opportunity = 0
        total_value += opportunity

    print(f"\nDeals by Stage:")
    for stage, count in stages.items():
        print(f"  {stage}: {count}")

    print(f"\nDeals by Currency:")
    for currency, count in currencies.items():
        print(f"  {currency}: {count}")

    print(f"\nTotal Deal Value: {total_value}")

    # Date range
    if deals:
        dates = [deal.get('DATE_CREATE') for deal in deals if deal.get('DATE_CREATE')]
        if dates:
            dates.sort()
            print(f"\nDate Range: {dates[0]} to {dates[-1]}")

def save_to_file(deals, filename="bitrix_deals.json"):
    """Save deals to JSON file"""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(deals, f, indent=2, ensure_ascii=False)
        print(f"\nData saved to {filename}")
    except Exception as e:
        print(f"Error saving to file: {e}")

def main():
    print("Fetching deals from Bitrix24...")
    deals = get_bitrix_deals()

    if deals:
        analyze_deals(deals)
        save_to_file(deals)
        print("\nDone!")
    else:
        print("No deals found or error occurred.")

if __name__ == "__main__":
    main()
